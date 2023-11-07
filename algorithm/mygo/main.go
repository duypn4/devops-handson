package main

import (
	"fmt"
	"mygo/doctor"
)

func main() {
	var whatToSay string = doctor.Intro()

	fmt.Println(whatToSay)
}
