COMPONENT=st_df_table
NOT_RELEASE=_ST_TABLE_NOT_RELEASE_
venv::
	python -m venv venv
	venv/bin/pip install -U pip

install::
	venv/bin/pip install streamlit poetry twine wheel pandas flake8 flake8-pyproject black
	venv/bin/pip install -e .
	cd ${COMPONENT}/frontend && npm install

run::
	cd ${COMPONENT}/frontend && npm start &
	${NOT_RELEASE}=1 venv/bin/streamlit run ${COMPONENT}/example.py

run-front::
	cd ${COMPONENT}/frontend && npm start

run-st::
	${NOT_RELEASE}=1 venv/bin/streamlit run ${COMPONENT}/example.py


build::
	rm -rf build dist
	rm -rf ${COMPONENT}/frontend/build
	mkdir -p ${COMPONENT}/frontend/build
	cd ${COMPONENT}/frontend && npm run build
	rm -rf build/lib/${COMPONENT}/frontend/node_modules
	rm -rf build/bdist.linux-x86_64/${COMPONENT}/frontend/node_modules
	venv/bin/python setup.py sdist bdist_wheel

test::
	cd tests && make test

upload-test::
	$(MAKE) build
	venv/bin/python -m twine upload -u $${PYPI_USER} -p $${PYPI_PASS_TEST} --verbose --repository testpypi dist/*

upload::
	$(MAKE) build
	venv/bin/python -m twine upload -u $${PYPI_USER} -p $${PYPI_PASS} --verbose dist/*

