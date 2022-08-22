import http.server
import socketserver
from pathlib import Path
import io
import re

PORT = 8000

def get_examples_html():
  def get_examples():
    for example in Path('.').glob('Example *.js'):
      m = re.match(r'Example (.*)  .*\.js', example.name)
      yield f"""<li>
        <a href="/examples/{m.group(1)}">
          {example.stem}
        </a>
      </li>
      """
  examples = '\n'.join(get_examples())

  return f"""\
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Examples</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
  <h1>Examples</h1>
  <ul>
  {examples}
  </ul>
</body>
</html>
"""

class Handler(http.server.SimpleHTTPRequestHandler):
  def do_GET(self):
    if self.path == '/examples':
      return self.list_examples()

    super().do_GET()

  def list_examples(self):
    encoded = get_examples_html().encode('utf-8')

    self.send_response(200)
    self.send_header("Content-type", "text/html; charset=utf-8")
    self.send_header("Content-Length", str(len(encoded)))
    self.end_headers()
    self.wfile.write(encoded)

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"serving at http://localhost:{PORT}")
    try:
      httpd.serve_forever()
    except KeyboardInterrupt:
      pass
