#!/usr/bin/env python3
"""Build the V2 boards: inline Archivo (OFL, from the LabKit video assets) as base64 so each
board opens by double-click with no network. Usage: python3 G-DESIGN/_src/build.py"""
import base64
from pathlib import Path

SRC = Path(__file__).resolve().parent
OUT = SRC.parent / "planches" / "v2"
font = base64.b64encode((SRC / "fonts" / "archivo.woff2").read_bytes()).decode()

for src in sorted(SRC.glob("*.src.html")):
    html = src.read_text(encoding="utf-8").replace("/*ARCHIVO_B64*/", font)
    dst = OUT / src.name.replace(".src.html", ".html")
    dst.write_text(html, encoding="utf-8")
    print(f"{dst.relative_to(SRC.parent.parent)}  {len(html) // 1024} KB")
