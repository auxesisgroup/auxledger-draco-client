# !/bin/bash

gnome-terminal -x bash -c "$AUXNET/bin/gaux --datadir=$AUXNET/dataDirectory/publicNetwork init $1; $AUXNET/bin/gaux --datadir=$AUXNET/dataDirectory/publicNetwork --verbosity 4 --port=30303 --bootnodes=$2;" 
# echo $1
# bash ./shellscript.sh
# gnome-terminal -x  $AUXNET/bin/gaux --datadir=$AUXNET/dataDirectory --port=30403
