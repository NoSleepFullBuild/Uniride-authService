#include <stdio.h>
#include <stdlib.h>
#include <curl/curl.h>

int main(void){


// Initalisation de curl dans un pointeur prénommé *point.

    CURL *point = curl_easy_init();

    if(!point){
        printf("[-] Failed Initializing CURL");
        exit(-1);
    }

    CURLcode res;
    curl_easy_setopt(point,  CURLOPT_URL, "http://example.com");
    res = curl_easy_perform(point);

    if(res == CURLE_OK){
        printf("It working");
    }

    if(res != CURLE_OK){
        printf("[-] Could not fetch Webpage\n");
        exit(-2);
    }

    curl_easy_cleanup(point);
    return 0;

}