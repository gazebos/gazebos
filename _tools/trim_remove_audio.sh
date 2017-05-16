#!/bin/bash

default_extname=".mp4"
output_extname=".z.mp4"

arg_1=$1
arg_2=$2

source=$arg_1
source_slug=$(basename $(echo $arg_1 | sed 's/ /_/g'))
source_slug=${source_slug%.*}

output=${arg_2:=_assets/$source_slug$default_extname}
output=${output%.*}$output_extname

time_start=${start:="00:00"}
time_end=${end:="00:10"}

# ffmpeg -i "$source" -ss 00:${time_start} -to 00:${time_end} -c copy -an

ffmpeg -i "$source" -ss 00:${time_start} -to 00:${time_end} -vf scale=3168:-2 -an $output
