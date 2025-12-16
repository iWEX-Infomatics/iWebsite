from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in iwex_website/__init__.py
from iwex_website import __version__ as version

setup(
	name="iwex_website",
	version=version,
	description="iWEX Infomatics Website for ERPNext",
	author="iWEX Infomatics",
	author_email="emails@iwex.in",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)

