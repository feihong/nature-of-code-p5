import http.server
import socketserver
from pathlib import Path
import io

PORT = 8000

def get_html_prefix(title):
  return f"""\
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>{title}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
"""

html_suffix = '</body></html>'

class Handler(http.server.SimpleHTTPRequestHandler):
  def do_GET(self):
    if self.path == '/examples':
      with self.list_examples() as f:
        self.copyfile(f, self.wfile)
      return

    super().do_GET()

  def list_examples(self):
    r = []
    r.append(get_html_prefix('Examples'))
    r.append('<h1>Examples</h1>\n<ul>\n')
    for example in Path('.').glob('*.js'):
      r.append(f'<li>{example}</li>\n')
    r.append('</ul>')
    r.append(html_suffix)
    encoded = '\n'.join(r).encode('utf-8')

    f = io.BytesIO()
    f.write(encoded)
    f.seek(0)
    self.send_response(http.server.HTTPStatus.OK)
    self.send_header("Content-type", "text/html; charset=utf-8")
    self.send_header("Content-Length", str(len(encoded)))
    self.end_headers()
    return f

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"serving at http://localhost:{PORT}")
    try:
      httpd.serve_forever()
    except KeyboardInterrupt:
      pass
