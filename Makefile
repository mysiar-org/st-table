COMPONENT=st_table
NOT_RELEASE=_ST_TABLE_NOT_RELEASE_
venv::
	python -m venv venv
	venv/bin/pip install -U pip

install::
	venv/bin/pip install streamlit setuptools twine wheel pandas flake8 flake8-pyproject black
	venv/bin/pip install -e .
	cd ${COMPONENT}/frontend && npm install

run::
	cd ${COMPONENT}/frontend && npm start &
	. venv/bin/activate && ${NOT_RELEASE}=1 streamlit run ${COMPONENT}/example.py

run-front::
	cd ${COMPONENT}/frontend && npm start

run-st::
	. venv/bin/activate && ${NOT_RELEASE}=1 streamlit run ${COMPONENT}/example.py


build::
	rm -rf build dist
	rm -rf ${COMPONENT}/frontend/build
	mkdir -p ${COMPONENT}/frontend/build
	cd ${COMPONENT}/frontend && npm run build
	touch ${COMPONENT}/frontend/build/bootstrap.min.css.map
	. venv/bin/activate && python setup.py sdist bdist_wheel

test::
	cd tests && make test

upload-test::
	. venv/bin/activate && python -m twine upload -u $${PYPI_USER} -p $${PYPI_PASS_TEST} --verbose --repository testpypi dist/*

upload::
	. venv/bin/activate && python -m twine upload -u $${PYPI_USER} -p $${PYPI_PASS} --verbose dist/*

