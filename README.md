# PS5 Shortcut Deck

A phone-first static web app for collecting PlayStation 5 game shortcuts.

The current source transcript is:

https://robert-fiedor.github.io/youtube-transcriptions/transcripts/DSD_fAtBQc4-The-Ultimate-CQC-Guide---Metal-Gear-Solid-DELTA-Snake-Eater/DSD_fAtBQc4-The-Ultimate-CQC-Guide---Metal-Gear-Solid-DELTA-Snake-Eater.txt

The app extracts the PS5 CQC controls and practical tactics mentioned in the Metal Gear Solid Delta: Snake Eater transcript.

## Local use

Serve the folder with any static server:

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

## Publishing guard

This repository uses a tracked pre-commit hook in `.githooks/pre-commit`. Enable it after cloning:

```bash
git config core.hooksPath .githooks
```
