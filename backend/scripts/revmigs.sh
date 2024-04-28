cd db/migrations
nrMigs=`ls -1 | wc -l`
cd ../..

for i in $(seq 1 $nrMigs); do
  npm run migration:revert
done