(
  echo "starting Node.js Server!";
  node node/scripts/index.js;
  echo "Node.js server started!"
) & (
  sleep 2;
  echo "Starting VVE environment!";
  python commandline/scripts/vve.py;
)
