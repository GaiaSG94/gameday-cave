#!/usr/bin/env python3
"""Build the V2 boards into planches/v2/.

- 01-verre-souffle.src.html is the approved Game board: it is the single source of the style.
- Other *.src.html boards pull its CSS and JS through placeholders, so every page stays in
  strict continuity with the validated style:
    /*SHARED_CSS*/  -> the <style id="board"> and <style id="game"> blocks of the Game board
    /*SHARED_JS*/   -> liquids, flask drawing and the 70 % / 1:1 toggle
- Archivo (OFL, from the LabKit video assets) is inlined in base64: boards open with no network.
Usage: python3 G-DESIGN/_src/build.py
"""
import base64
import re
from pathlib import Path

SRC = Path(__file__).resolve().parent
OUT = SRC.parent / "planches" / "v2"
MASTER = SRC / "01-verre-souffle.src.html"

font = base64.b64encode((SRC / "fonts" / "archivo.woff2").read_bytes()).decode()
master = MASTER.read_text(encoding="utf-8")


def block(pattern):
    m = re.search(pattern, master, re.S)
    if not m:
        raise SystemExit(f"missing in master: {pattern}")
    return m.group(1)


shared_css = (
    block(r'(@font-face \{.*?\})\n')
    + "\n" + block(r'<style id="board">(.*?)</style>')
    + "\n" + block(r'<style id="game">(.*?)</style>')
)
shared_js = "\n".join(
    block(rf"(// <{name}>.*?// </{name}>)") for name in ("shared-liq", "shared-js", "shared-scale")
)

for src in sorted(SRC.glob("*.src.html")):
    html = src.read_text(encoding="utf-8")
    html = html.replace("/*SHARED_CSS*/", shared_css).replace("/*SHARED_JS*/", shared_js)
    html = html.replace("/*ARCHIVO_B64*/", font)
    dst = OUT / src.name.replace(".src.html", ".html")
    dst.write_text(html, encoding="utf-8")
    print(f"{dst.relative_to(SRC.parent.parent)}  {len(html) // 1024} KB")
