#include <stdio.h>
#include <string.h>

void vulnerable_function(const char *input) {

    char buffer[100];

    strcpy(buffer, input); 
    printf("Buffer content: %s\n", buffer);
}
