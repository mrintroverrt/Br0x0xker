pkgdatadir = get_option('prefix') / get_option('datadir') / meson.project_name()
moduledir = pkgdatadir / 'br0x0xker'
gnome = import('gnome')

gnome.compile_resources('br0x0xker',
  'br0x0xker.gresource.xml',
  gresource_bundle: true,
  install: true,
  install_dir: pkgdatadir,
)

python = import('python')

conf = configuration_data()
conf.set('PYTHON', python.find_installation('python3').full_path())
conf.set('VERSION', meson.project_version())
conf.set('localedir', get_option('prefix') / get_option('localedir'))
conf.set('pkgdatadir', pkgdatadir)

configure_file(
  input: 'br0x0xker.in',
  output: 'br0x0xker',
  configuration: conf,
  install: true,
  install_dir: get_option('bindir'),
  install_mode: 'r-xr-xr-x'
)

br0x0xker_sources = [
  '__init__.py',
  'main.py',
  'window.py',
]

install_data(br0x0xker_sources, install_dir: moduledir)
