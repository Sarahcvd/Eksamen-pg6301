# Eksamen Webutvikling og API-design

##Antakelser jeg har tatt om oppgaven 
Jeg har gått ut i fra at vi skal lage en chat-funksjonalitet og at den er en selvstendig del i applikasjonen og den henger ikke sammen med login eller å kunne legge til brukere 

Å legge til brukere vil ikke påvirke hvordan chatten fungerer

Chat-meldinger blir lagret med websockets på serversiden og skrevet ut med tilhørende brukernavn 

#### Functional requirements
Oppgave 1 - Uten å logge inn med Google vil man ikke ha tilgang til noe annen funksjonalitet 

Oppgave 2 - Man får kun tilgang til chatten om man er logget inn med Google. 
Man må også legge inn et brukernavn slik at man vet hvilken bruker som skriver hva. 
På den måten kan flere brukere snakke sammen. 

Oppgave 3 - Siden man må skrive inn brukernavn så er det mulig å se hvilke meldinger man selv har sendt


#
###Kjøre applikasjonen 
1. Unzip prosjektet til én mappe, og naviger til det i CLI
2. Kjør kommando: `npm install`
    * Dette setter opp alle dependencies fra package.json
3. Kjør tester med `npm test` eller start applikasjonen med `npm start`
    * Etter å ha startet npm start, åpne en browser og naviger til http://localhost:3000 

#
### Intro 

* Etter å ha navigert til http://localhost:3000 vil komme til en login side hvor det benyttes Google for å logge inn 
* Etter man har logget inn med Google blir man tatt til forsiden 
    * Det er ikke mulig å fortsette uten å logge inn (selv ikke om man endrer url)

#
#### Hjemmesiden
Her er det en oversikt over alle funksjoner som finnes

* Profile Page - her kan man se hvem som er logget inn


"User info"
* Add a New User - mulighet for å legge inn brukere med navn og epost
    * Dette blir lagt til i et API som ligger på serveren 
* See User Info - en liste over brukere som er lagt inn 
    * Det er mulig å endre eksisterende brukere ved å trykke på dem
  
"Chat"
* Chat - en fungerende chat som kjører på websockets 
    * Her vil man først bli bedt om å legge inn et username
    * Så vil man kunne sende chatmeldinger


Øvrig er det en "Back to home" knapp på alle sider

#
#### Testing 
For å kjøre tester skriver man `npm test` 
* Her vil man automatisk få frem coverage på samtlige filer i prosjektet 

Jeg har 47% testdekning 

#
#### Struktur 
Client-filer finnes i: `src/client`

Components finnes i: `src/client/Components`

Custom hooks finnes i: `src/client/lib`

Server-filer finnes i: `src/server`

Alle tester finnes i: `src/__tests__`

#
#### Samarbeid i oppgaven: 
Jeg har ikke kopiert kode fra andre, men jeg har basert store deler av den fra forelesninger vi har hatt og tatt mye inspirasjon fra dem

I tillegg har jeg snakket om oppgaven med medstudenter og jeg har derfor kommet frem til relativt lik kode som dem

Følgende kode (som ligger i Application.jsx) har jeg fått av en medstudent: 

`{!access_token ? (
      <Redirect to={"/"} />
    ) : ( 
    <Link to={"/home"}>Back to home </Link>
        )}`