set -x
# clean stuff to be safe
rm -r client/build || true
rm -r server/build || true
rm -r server/public || true

# build client
cd client && npm install && npm run build

cd ..
# install packages for server
cd server && npm install
cd ..

# copy build
cp -r client/build server
cp -r client/public server
set +x
