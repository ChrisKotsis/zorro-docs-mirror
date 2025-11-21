#!/usr/bin/env python3
"""
Convert Zorro HTML documentation to clean Markdown format
Optimized for LLM consumption
"""

import os
import re
import sys
from pathlib import Path
from bs4 import BeautifulSoup
import html2text

def setup_html2text():
    """Configure html2text for clean conversion"""
    h = html2text.HTML2Text()
    h.ignore_links = False
    h.ignore_images = False
    h.ignore_emphasis = False
    h.body_width = 0  # No wrapping
    h.unicode_snob = True
    h.skip_internal_links = False
    h.inline_links = True
    h.protect_links = True
    h.wrap_links = False
    return h

def clean_html(html_content):
    """Clean and preprocess HTML before conversion"""
    soup = BeautifulSoup(html_content, 'html.parser')

    # Remove script and style elements
    for script in soup(["script", "style"]):
        script.decompose()

    # Remove navigation elements if present
    for nav in soup.find_all(['nav', 'header', 'footer']):
        nav.decompose()

    # Find main content (usually in body or main content div)
    main_content = soup.find('body')
    if not main_content:
        main_content = soup

    return str(main_content)

def convert_html_to_markdown(html_file, output_file):
    """Convert a single HTML file to Markdown"""
    try:
        # Read HTML
        with open(html_file, 'r', encoding='utf-8') as f:
            html_content = f.read()

        # Clean HTML
        cleaned_html = clean_html(html_content)

        # Convert to markdown
        h = setup_html2text()
        markdown = h.handle(cleaned_html)

        # Post-process markdown
        # Remove excessive blank lines
        markdown = re.sub(r'\n{3,}', '\n\n', markdown)

        # Clean up code blocks
        markdown = re.sub(r'```\n\n+', '```\n', markdown)

        # Ensure file ends with single newline
        markdown = markdown.rstrip() + '\n'

        # Write markdown
        output_file.parent.mkdir(parents=True, exist_ok=True)
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(markdown)

        return True

    except Exception as e:
        print(f"Error converting {html_file}: {e}", file=sys.stderr)
        return False

def convert_directory(input_dir, output_dir):
    """Convert all HTML files in a directory to Markdown"""
    input_path = Path(input_dir)
    output_path = Path(output_dir)

    # Find all .htm and .html files
    html_files = list(input_path.rglob('*.htm')) + list(input_path.rglob('*.html'))

    print(f"Found {len(html_files)} HTML files to convert")

    converted = 0
    failed = 0

    for html_file in html_files:
        # Calculate relative path
        rel_path = html_file.relative_to(input_path)

        # Change extension to .md
        md_path = output_path / rel_path.with_suffix('.md')

        print(f"Converting: {rel_path} -> {md_path.relative_to(output_path)}")

        if convert_html_to_markdown(html_file, md_path):
            converted += 1
        else:
            failed += 1

    print(f"\n✅ Converted: {converted}")
    if failed > 0:
        print(f"❌ Failed: {failed}")

    return converted, failed

def main():
    """Main entry point"""
    # Default paths
    input_dir = "./zorro-docs-output"
    output_dir = "./zorro-docs-markdown"

    # Check if custom paths provided
    if len(sys.argv) > 1:
        input_dir = sys.argv[1]
    if len(sys.argv) > 2:
        output_dir = sys.argv[2]

    print(f"Input directory: {input_dir}")
    print(f"Output directory: {output_dir}")
    print()

    # Check dependencies
    try:
        import html2text
        import bs4
    except ImportError as e:
        print("Error: Missing dependencies")
        print("Install with: pip install beautifulsoup4 html2text")
        sys.exit(1)

    # Check input directory exists
    if not os.path.exists(input_dir):
        print(f"Error: Input directory '{input_dir}' does not exist")
        print("\nRun the crawler first:")
        print("  node crawler-complete.js")
        sys.exit(1)

    # Convert
    converted, failed = convert_directory(input_dir, output_dir)

    # Copy images
    images_src = Path(input_dir) / 'images'
    images_dst = Path(output_dir) / 'images'

    if images_src.exists():
        print(f"\n📁 Copying images to {images_dst}")
        import shutil
        if images_dst.exists():
            shutil.rmtree(images_dst)
        shutil.copytree(images_src, images_dst)
        print("✅ Images copied")

    print(f"\n🎉 Done! Markdown docs in: {output_dir}")

    return 0 if failed == 0 else 1

if __name__ == '__main__':
    sys.exit(main())
