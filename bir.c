#include <stdio.h>
#include <string.h> // strlen()
#include <ctype.h>


int main(){

    char text[50];

    printf("Soz kiriting : ");
    scanf("%s", text);


    int len = strlen(text);


    int i = 0;
    int flag=  0;
    int x = len-1;
    while (i < len){

        if (text[i] != text[x]){
            flag = 1;
            break;
        }
        
        i++;
        x--;
    }

    if (flag == 0){
        printf("Polindrom");
    }else{
        printf("Polindrom emas");
    } 
}
