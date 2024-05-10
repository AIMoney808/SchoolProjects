.data
	#get user input (floats)
	prompt:    .asciiz "Enter a float value for the Width (in feet) of your frame: "
	message: .asciiz  "You will need, "  
	mess2:   .asciiz " feet for your frame length to observe the Golden Ratio"
	#golden ratio = 1.618
	gr1: .float 1.618
	
.text
	#get golden ratio
	lwc1 $f4, gr1
	
	#prompt user
	li $v0, 4
	la $a0, prompt
	syscall
	
	#get user input
	li $v0, 6 #code to get aa float from user store in f0
	syscall
	
	#display message
	li $v0, 4
	la $a0, message
	syscall
	
	#display value
	li $v0, 2 #display a float
	mul.s $f12, $f0, $f4
	syscall
	
	#display message
	li $v0, 4
	la $a0, mess2
	syscall
	
