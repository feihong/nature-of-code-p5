import http.server
import socketserver
from pathlib import Path
import re

PORT = 8000

def get_examples_html():
  def get_examples():
    for example in sorted(Path('.').glob('Example *.js'), key=lambda p: p.name):
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

def get_example_html(code):
  glob = f'Example {code}  *.js'
  example = next(Path('.').glob(glob))
  title = example.stem.replace('  ', ': ')

  return f"""\
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>{title}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
   <style>
    canvas {{
      border: 1px solid black;
    }}
  </style>
  <script src="/p5.min.js"></script>
  <script src="/{example.name}"></script>
</head>
<body>
  <h1>{title}</h1>
  <main></main>
</body>
</html>
"""

class Handler(http.server.SimpleHTTPRequestHandler):
  def do_GET(self):
    if self.path == '/examples' or self.path == '/examples/':
      return self.list_examples()
    elif self.path.startswith('/examples/'):
      return self.render_example()

    super().do_GET()

  def list_examples(self):
    encoded = get_examples_html().encode('utf-8')

    self.send_response(200)
    self.send_header("Content-type", "text/html; charset=utf-8")
    self.send_header("Content-Length", str(len(encoded)))
    self.end_headers()
    self.wfile.write(encoded)

  def render_example(self):
    m = re.match(r'/examples/(.*)', self.path)
    code = m.group(1)
    encoded = get_example_html(code).encode('utf-8')

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
