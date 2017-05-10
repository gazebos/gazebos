#!/bin/bash

default_extname=".ogg"
output_extname=".z.ogg"

arg_1=$1
arg_2=$2

source=$arg_1
source_slug=$(basename $(echo $arg_1 | sed 's/ /_/g'))
source_slug=${source_slug%.*}

output=${arg_2:=src/assets/$source_slug$default_extname}
output=${output%.*}$output_extname

time_start=${start:="00:00"}
time_end=${end:="00:10"}

ffmpeg -i "$source" $output
