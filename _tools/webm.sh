#!/bin/bash

default_extname=".webm"

arg_1=$1
arg_2=$2

source=$arg_1
source_basename=${arg_1%.*}

output=${arg_2:=$source_basename$default_extname}

ffmpeg -i "$source" $output
