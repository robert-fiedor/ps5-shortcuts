# PS5 Shortcut Deck

A phone-first static web app for collecting PlayStation 5 game shortcuts.

The initial source transcript is:

https://robert-fiedor.github.io/youtube-transcriptions/transcripts/4PqGPZtyFtw/4PqGPZtyFtw.txt

That transcript does not mention PS5 games or controller shortcuts, so the current app displays the shortcut-style steps that are actually present in the source. The data model is ready for game shortcut entries once a PS5 controls transcript or list is added.

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
