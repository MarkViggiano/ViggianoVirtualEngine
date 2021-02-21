#COPY AND PASTE THE TEXT BELOW THIS INTO A COMMAND PROMPT TO START VVE

cd node/scripts/
start cmd.exe /k "node index.js"
cd ../../

cd commandline/scripts/
start cmd.exe /k "python vve.py"
cd ../../

cd dotnet
start cmd.exe /k "dotnet run"
cd ../
