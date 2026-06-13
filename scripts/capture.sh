#!/usr/bin/env bash
# Capture a screenshot for an entry.
# Usage: ./scripts/capture.sh <url> <output-name>
# Wayback tip: insert `if_` after the timestamp to hide the archive toolbar,
#   e.g. https://web.archive.org/web/19981202230410if_/http://www.google.com/
# Year-form URLs (…/web/1998/http://google.com) redirect to the nearest capture;
# resolve the final URL first, then add if_.
# Archive-rot check: if the capture looks unstyled/collapsed, the CSS probably didn't
#   archive. Fetch the raw HTML (use `id_` instead of `if_`) and check <link stylesheet>
#   refs; CDX whether those .css are 200. Fix by trying other dates, grabbing a surviving
#   product image (e.g. /images/tour/*.jpg), or using a sourced shot / quote-card.
#   Genuinely-bare sites (Google '98, craigslist) are authentic — don't "fix" real minimalism.
# Re-swap = new filename: Next/browsers cache optimized images by URL, so overwriting a
#   file in place serves the stale copy in preview + prod. Rename the swapped file.
set -euo pipefail
URL="$1"; NAME="$2"
mkdir -p public/screenshots
bunx playwright screenshot --viewport-size=1280,960 "$URL" "public/screenshots/${NAME}.png"
echo "Captured ${URL} -> public/screenshots/${NAME}.png"
