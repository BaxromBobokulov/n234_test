#include <stdio.h>

int main(){


    int hararot;

    printf("Haroratni kiriting :");
    scanf("%d", &hararot);


    if(hararot > 30){

        printf("Issiq");
    }else if(hararot > 15){

        printf("Iliq");
    }else{
        
        printf("Sovuq");
    }

}