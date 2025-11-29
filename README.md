# ToDo App

ToDo App je spletna aplikacija za upravljanje opravil, razvita kot del učne naloge. 
Projekt je sestavljen iz **Spring Boot** backend-a, **Node.js/Express** frontend-a in **MySQL** podatkovne baze. 
Aplikacija omogoča ustvarjanje, urejanje, označevanje dokončanih opravil ter brisanje opravil.

---

## 1. Dokumentacija za razvijalce

### Projektna struktura

todo-app/<br />
│<br />
├─ backend/ # Spring Boot REST API<br />
│ ├─ src/main/java/... # Kontrolerji, servisi, modeli, repozitoriji<br />
│ ├─ src/main/resources/ # application.properties (povezava na MySQL)<br />
│ └─ pom.xml # Maven odvisnosti in konfiguracija<br />
│<br />
├─ frontend/ # Node.js + Express strežnik<br />
│ ├─ public/ # Statične datoteke (HTML, CSS, JS)<br />
│ ├─ views/ # EJS predloge (če uporabljene)<br />
│ ├─ package.json # Node odvisnosti<br />
│ └─ server.js # Vstopna točka frontenda<br />
│<br />
└─ docker-compose.yml # (Opcijsko) Docker orkestracija<br />

### Tehnologije in verzije

| Tehnologija | Verzija | Namen |
|------------|---------|--------|
| Java | 17+ | Poganjanje backend aplikacije |
| Spring Boot | 3.x | Backend REST API |
| Node.js | 18+ | Frontend strežnik |
| MySQL | 8.x | Relacijska podatkovna baza |
| Maven | 3.x | Upravljanje odvisnosti backend |
| npm | 9.x | Upravljanje odvisnosti frontend |

### Standardi kodiranja
- Backend uporablja **MVC arhitekturo** (Controller → Service → Repository).
- Komunikacija frontenda in backend-a poteka prek **REST API**.
- Logika in viri so ločeni po nivojih in modulih.

---

## 2. Navodila za namestitev

### Predpogoji
Pred zagonom potrebujete:
- Java 17+
- Node.js 18+
- MySQL 8+
- Maven
- Dostop do terminala

### 2.1. Ustvarite podatkovno bazo

V MySQL zaženite:

```sql
CREATE DATABASE todo_app;
```
Nato v backend/src/main/resources/application.properties nastavite:


spring.datasource.url=jdbc:mysql://localhost:3306/todo_app
spring.datasource.username=VAŠ_UPORABNIK
spring.datasource.password=VAŠE_GESLO
spring.jpa.hibernate.ddl-auto=update

### 2.2. Zagon backend strežnika
cd backend
mvn spring-boot:run
Backend bo tekel na:

http://localhost:8080<br />
### 2.3. Namestitev in zagon frontenda
bash
Kopiraj kodo
cd ../frontend
npm install
npm start
Frontend bo na naslovu:

http://localhost:3000<br />
## 3. Navodila za razvijalce (prispevanje)
Fork-aj repozitorij na GitHubu

Ustvari novo vejo:

git checkout -b feature/ime-funkcije
Naredi spremembe in commite:

git commit -m "Dodana nova funkcionalnost"
Push:

git push origin feature/ime-funkcije
Odpri Pull Request

Pravila prispevanja
Ne briši obstoječe funkcionalnosti brez utemeljitve.

Pred PR preveri, da sistem teče brez napak.

Koda naj bo berljiva in strukturirana.

## 4. API (osnovni endpoints)
Metoda	Endpoint	Opis
GET	/api/todos	Pridobi vsa opravila
POST	/api/todos	Dodaj novo opravilo
PUT	/api/todos/{id}	Posodobi določeno opravilo
DELETE	/api/todos/{id}	Odstrani opravilo

## 5. Vizija projekta

Vizija projekta Todo aplikacije je uporabnikom omogočiti enostavno, pregledno in učinkovito upravljanje njihovih nalog v vsakodnevnem življenju. Aplikacija omogoča ustvarjanje, urejanje, pregledovanje, filtriranje in dokončanje nalog na zanimiv način.
Cilj aplikacije je izboljšati organizacijo in produktivnost uporabnika tako, da mu pomaga ohranjati pregled nad obveznostmi ter zmanjšati stres, ki nastane zaradi pozabljanja nalog. Aplikacija je zasnovana tako, da je preprosta za uporabo, vizualno prijetna in dostopna na različnih napravah.
Aplikacija je namenjena:<br />
 - študentom, ki želijo spremljati šolske obveznosti,<br />
 - zaposlenim, ki želijo organizirati delovne naloge,<br />
 - posameznikom, ki želijo strukturirati vsakodnevna opravila.<br />
V prihodnosti bi v aplikacijo vključili še prijavo in registracijo uporabnikov, da lahko shranijo vsa opravila. Uporabniki bi lahko tudi shranili vsa opravila.

## 6. Besednjak
| Izraz                 | Pomen                                                                                    |
| --------------------- | ---------------------------------------------------------------------------------------- |
| **Todo**              | Posamezna naloga ali opravilo, ki ga uporabnik želi spremljati.                          |
| **Seznam nalog**      | Prikaz vseh nalog, ki jih je uporabnik ustvaril.                                         |
| **Aktivna naloga**    | Naloga, ki še ni bila označena kot opravljena.                                           |
| **Opravljena naloga** | Naloga, ki jo je uporabnik označil kot končano.                                          |
| **Opis naloge**       | Dodatni opis, komentar ali opomba, povezana z nalogo.                                    |
| **Status naloge**     | Lastnost, ki označuje ali je naloga dokončana ali ne.                                    |
| **Filtriranje**       | Funkcionalnost, ki omogoča prikaz samo določenega tipa nalog (npr. opravljene, aktivne). |
| **API**               | Vmesnik med frontendom in backendom za izmenjavo podatkov.                               |
| **Backend**           | Strežniški del aplikacije, ki upravlja podatke in poslovno logiko.                       |
| **Frontend**          | Uporabniški del aplikacije, kjer uporabnik vidi in uporablja aplikacijo.                 |

## 7.DPU
<img width="693" height="701" alt="RIS drawio (2)" src="https://github.com/user-attachments/assets/7310f5f3-e5be-4b4a-9375-944da64c4569" />


### 8. Podrobni opisi
<table style="width:100%; border-collapse: collapse; border: 1px solid black;">
    <tr>
        <td style="border: 1px solid black; padding: 8px;">Primer uporabe: Dodaj opravilo</td>
        <td style="border: 1px solid black; padding: 8px; width: 30%;">ID: 1</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Cilj: Uporabnik želi ustvariti novo opravilo.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Akterji: Uporabnik</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Predpogoji: Aplikacija je zagnana, uporabnik ima dostop do obrazca za dodajanje nalog.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Stanje sistema po PU: V bazo se doda novo opravilo.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Scenariji: <br>
         1.Korak: Uporabnik klikne »Dodaj opravilo«.<br> 
         2.Korak: Sistem prikaže obrazec.<br>
         3.Korak: Uporabnik vnese naslov, rok, kategorijo ipd.<br>
         4.Korak: Sistem preveri podatke.<br>
         5.Korak: Sistem shrani opravilo.<br>
         6.Korak: Sistem ponudi dodatne vključene korake: Dodaj opis opravila, Dodaj opravilo v koledar<br>
        </td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Alternativni tokovi: Neveljavni podatki → sistem vrne napako.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Izjeme: Napaka v bazi → obvestilo.</td>
    </tr>
</table>


<table style="width:100%; border-collapse: collapse; border: 1px solid black;">
    <tr>
        <td style="border: 1px solid black; padding: 8px;">Primer uporabe: Dodaj opis opravila</td>
        <td style="border: 1px solid black; padding: 8px; width: 30%;">ID: 2</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Cilj: Dodati podrobnejši opis opravila.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Akterji: Uporabnik</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Predpogoji: Opravilo je v postopku dodajanja ali urejanja.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Stanje sistema po PU: Opis se zapiše k opravilu.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Scenariji: <br>
         1.Korak: Uporabnik vnese opis..<br> 
         2.Korak: Sistem ga shrani.<br>
        </td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Alternativni tokovi: Predolg opis → sistem vrne napako.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Izjeme: Prevelika dolžina opisa.</td>
    </tr>
</table>




<table style="width:100%; border-collapse: collapse; border: 1px solid black;">
    <tr>
        <td style="border: 1px solid black; padding: 8px;">Primer uporabe: Dodaj opravilo v koledar</td>
        <td style="border: 1px solid black; padding: 8px; width: 30%;">ID: 3</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Cilj: Uporabnik želi, da se opravilo prikaže tudi v koledarju.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Akterji: Uporabnik</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Predpogoji: Opravilo ima določen rok.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Stanje sistema po PU: V koledarju se ustvari dogodek povezan z opravilo.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Scenariji: <br> 
         1.Korak: Sistem preveri, ali je določen datum.<br>
         2.Korak: Sistem ustvari koledarski dogodek.<br>
         3.Korak: Dogodek se poveže z opravilom.<br>
        </td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Alternativni tokovi: Uporabnik ne določi datuma → opozorilo.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Izjeme: Dogodek se ne ustvari — sistem izpiše napako, opravilo pa kljub temu ostane ustvarjeno.</td>
    </tr>
</table>





<table style="width:100%; border-collapse: collapse; border: 1px solid black;">
    <tr>
        <td style="border: 1px solid black; padding: 8px;">Primer uporabe: Uredi opravilo</td>
        <td style="border: 1px solid black; padding: 8px; width: 30%;">ID: 4</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Cilj: Spremeniti podatke obstoječega opravila.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Akterji: Uporabnik</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Predpogoji: Opravilo obstaja.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Stanje sistema po PU: Podatki opravila se posodobijo.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Scenariji: <br> 
         1.Korak: Uporabnik klikne na opravilo.<br>
         2.Korak: Sistem prikaže obrazec.<br>
         3.Korak: Uporabnik spremeni podatke.<br>
         4.Korak: Sistem jih preveri in shrani.<br>
         5.Korak: Možnost označitve kot dokončano.<br>
        </td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Alternativni tokovi: Urejeni podatki niso veljavni → opozorilo.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Izjeme: Neveljavni podatki → napaka. </td>
    </tr>
</table>


<table style="width:100%; border-collapse: collapse; border: 1px solid black;">
    <tr>
        <td style="border: 1px solid black; padding: 8px;">Primer uporabe: Označi kot dokončano</td>
        <td style="border: 1px solid black; padding: 8px; width: 30%;">ID: 5</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Cilj: Označiti, da je naloga opravljena.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Akterji: Uporabnik</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Predpogoji: Opravilo obstaja in trenutno ni označeno kot dokončano.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Stanje sistema po PU: Opravilo se označi kot dokončano.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Scenariji: <br> 
         1.Korak: Uporabnik klikne na »Označi kot dokončano«.<br>
         2.Korak: Sistem spremeni status opravila v dokončano.<br>
         3.Korak: Sistem prikaže posodobljeni seznam opravil.<br>
        </td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Alternativni tokovi: Opravilo je že dokončano → možnost se ne prikaže.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Izjeme: Napaka pri shranjevanju statusa → opozorilo uporabniku.</td>
    </tr>
</table>


<table style="width:100%; border-collapse: collapse; border: 1px solid black;">
    <tr>
        <td style="border: 1px solid black; padding: 8px;">Primer uporabe: Izbriši opravilo</td>
        <td style="border: 1px solid black; padding: 8px; width: 30%;">ID: 6</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Cilj: Uporabnik želi odstraniti opravilo iz sistema.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Akterji: Uporabnik</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Predpogoji: Opravilo obstaja in je prikazano uporabniku.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Stanje sistema po PU: Opravilo je trajno izbrisano iz baze podatkov.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Scenariji: <br> 
         1.Korak: Uporabnik klikne »Izbriši«.<br>
         2.Korak: Sistem zahteva potrditev izbrisa.<br>
         3.Korak: Uporabnik potrdi izbris.<br>
         4.Korak: Sistem izbriše opravilo iz baze.<br>
         5.Korak: Sistem posodobi seznam opravil.<br>
        </td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Alternativni tokovi: Uporabnik prekliče izbris → opravilo ostane nespremenjeno.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Izjeme: Napaka brisanja iz baze → sistem vrne napako.</td>
    </tr>
</table>


<table style="width:100%; border-collapse: collapse; border: 1px solid black;">
    <tr>
        <td style="border: 1px solid black; padding: 8px;">Primer uporabe: Prikaži opravila</td>
        <td style="border: 1px solid black; padding: 8px; width: 30%;">ID: 7</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Cilj: Prikazati uporabniku seznam vseh opravil.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Akterji: Uporabnik, Gost</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Predpogoji: Opravila obstajajo v sistemu.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Stanje sistema po PU: Sistem ostane nespremenjen.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Scenariji: <br> 
         1.Korak: Uporabnik odpre pogled opravil.<br>
         2.Korak: Sistem pridobi opravila iz baze.<br>
         3.Korak: Sistem jih prikaže uporabniku.<br>
        </td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Alternativni tokovi: Ni opravil → prazen seznam.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Izjeme: Napaka pri pridobivanju iz baze → obvestilo uporabniku.</td>
    </tr>
</table>


<table style="width:100%; border-collapse: collapse; border: 1px solid black;">
    <tr>
        <td style="border: 1px solid black; padding: 8px;">Primer uporabe: Išči opravila</td>
        <td style="border: 1px solid black; padding: 8px; width: 30%;">ID: 8</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Cilj: Najti opravila glede na iskalni niz, ki ga vnese uporabnik.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Akterji: Uporabnik, Gost</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Predpogoji: Iskalni niz je vnesen.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Stanje sistema po PU: Sistem ostane nespremenjen – prikaže filtrirane rezultate.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Scenariji: <br> 
         1.Korak: Uporabnik vnese iskani niz.<br>
         2.Korak: Sistem poišče ujemanja v bazi.<br>
         3.Korak: Sistem prikaže rezultate iskanja.<br>
        </td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Alternativni tokovi: Ni najdenih rezultatov → sistem prikaže "Ni zadetkov".</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Izjeme: Napaka pri iskanju v bazi → obvestilo uporabniku.</td>
    </tr>
</table>


<table style="width:100%; border-collapse: collapse; border: 1px solid black;">
    <tr>
        <td style="border: 1px solid black; padding: 8px;">Primer uporabe: Filtriraj opravila</td>
        <td style="border: 1px solid black; padding: 8px; width: 30%;">ID: 9</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Cilj: Prikazati le opravila, ki ustrezajo izbranim kriterijem.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Akterji: Uporabnik, Gost</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Predpogoji: Opravila obstajajo v sistemu.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Stanje sistema po PU: Sistem ostane nespremenjen – spremeni se samo prikaz.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Scenariji: <br> 
         1.Korak: Uporabnik odpre filtriranje.<br>
         2.Korak: Izbere filter (datum, status, kategorija).<br>
         3.Korak: Sistem prikaže filtrirana opravila.<br>
         4.Korak: Možnost izbire "Napredno filtriranje".<br>
        </td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Alternativni tokovi: Izbran filter ne vrne rezultatov → prikaže se prazen seznam.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Izjeme: Neveljaven filter → sistem izpiše opozorilo.</td>
    </tr>
</table>


<table style="width:100%; border-collapse: collapse; border: 1px solid black;">
    <tr>
        <td style="border: 1px solid black; padding: 8px;">Primer uporabe: Napredno filtriranje</td>
        <td style="border: 1px solid black; padding: 8px; width: 30%;">ID: 10</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Cilj: Omogočiti kombinacijo več naprednih filtrov za natančnejši prikaz opravil.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Akterji: Uporabnik, Gost</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Predpogoji: Osnovno filtriranje je omogočeno.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Stanje sistema po PU: Sistem ostane nespremenjen – prikaže rezultat naprednih filtrov.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Scenariji: <br> 
         1.Korak: Uporabnik izbere možnost »Napredno filtriranje«.<br>
         2.Korak: Sistem prikaže dodatne parametre (več filtrov).<br>
         3.Korak: Uporabnik vnese pogoje.<br>
         4.Korak: Sistem prikaže rezultat filtriranja.<br>
        </td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Alternativni tokovi: Filter se med seboj izključuje → sistem opozori uporabnika.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Izjeme: Napaka pri filtriranju → prikaže se sporočilo o napaki.</td>
    </tr>
</table>


<table style="width:100%; border-collapse: collapse; border: 1px solid black;">
    <tr>
        <td style="border: 1px solid black; padding: 8px;">Primer uporabe: Prikaži opravila v koledarju</td>
        <td style="border: 1px solid black; padding: 8px; width: 30%;">ID: 11</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Cilj: Vizualni prikaz opravil v koledarskem pogledu.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Akterji: Uporabnik, Gost</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Predpogoji: Opravila imajo določene datume.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Stanje sistema po PU: Sistem ostane nespremenjen – prikaže koledarski pogled.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Scenariji: <br> 
         1.Korak: Uporabnik odpre pogled koledarja.<br>
         2.Korak: Sistem pridobi opravila z rokom.<br>
         3.Korak: Sistem prikaže opravila na ustreznih datumih.<br>
        </td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Alternativni tokovi: Ni opravil z datumi → prikaže se prazen koledar.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Izjeme: Napaka pri nalaganju koledarja → sistem prikaže opozorilo.</td>
    </tr>
</table>

<table style="width:100%; border-collapse: collapse; border: 1px solid black;">
    <tr>
        <td style="border: 1px solid black; padding: 8px;">Primer uporabe: Reschedule</td>
        <td style="border: 1px solid black; padding: 8px; width: 30%;">ID: 12</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Cilj: Uporabnik želi spremeniti datum opravila neposredno iz koledarskega pogleda.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Akterji: Uporabnik</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Predpogoji: Opravilo je dodano v koledar in ima določen datum.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Stanje sistema po PU: Posodobi se rok opravila v bazi podatkov.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Scenariji: <br> 
         1.Korak: Uporabnik prestavi opravilo na drug dan (drag & drop).<br>
         2.Korak: Sistem preveri veljavnost novega datuma.<br>
         3.Korak: Sistem shrani spremembo v bazo.<br>
         4.Korak: Koledar se posodobi.<br>
        </td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Alternativni tokovi: Premik na neveljaven datum → sistem prepreči premik.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Izjeme: Napaka pri shranjevanju novega datuma → opozorilo uporabniku.</td>
    </tr>
</table>
<br />

<img width="2041" height="1381" alt="image" src="https://github.com/user-attachments/assets/c53a2216-db46-492e-b8a1-df01b206cfa2" />

# Razredni diagram

Ta dokument opisuje razredni diagram aplikacije Todo, ki vključuje **frontend** in **backend** komponente. Namen je prikazati vlogo vsakega razreda, ključne metode ter celotno dinamiko aplikacije.

---

## Frontend

### `TodoClientApp`
- **Vloga:** Glavna aplikacija na strani uporabnika.
- **Namen:** Upravljanje uporabniškega vmesnika in komunikacije z backendom.
- **Ključne metode:**
  - `apiCall(endpoint, options)`: Pošilja zahteve na strežnik.
  - `loadTodo()`: Nalaganje opravil.
  - `handleLogin(event)`, `handleLogout(event)`: Upravljanje prijave in odjave.
  - `checkPermission(action)`: Preverjanje dovoljenj glede na vlogo.
  - `handleReschedule(id, newDate)`: Sprememba roka opravila.

---

## Avtentikacija

### `AuthController`
- **Vloga:** Sprejema zahteve za prijavo in registracijo.
- **Metode:** `login()`, `register()`

### `UserService`
- **Vloga:** Poslovna logika za uporabnike.
- **Metode:** `loadUserByUsername()`, `registerUser()`

### `UserRepository`
- **Vloga:** Dostop do podatkovne baze uporabnikov.
- **Metoda:** `findByUsername()`

### `User` (entiteta)
- **Vloga:** Predstavlja uporabnika v sistemu.
- **Atributi:** ID, uporabniško ime, geslo, vloga.
- **Metode:** Getterji in setterji.

### `Role` (enum)
- **Vloga:** Določa tip uporabnika.
- **Vrednosti:** `ADMIN`, `GUEST`

---

## Upravljanje opravil (Todos)

### `TodoController`
- **Vloga:** Sprejema REST zahteve za opravila.
- **Ključne metode:**
  - `getAllTodos()`, `getTodoById(id)`
  - `createTodo(todo)`, `updateTodo(id, todo)`, `deleteTodo(id)`
  - `getCompletedTodos()`, `getIncompleteTodos()`
  - `searchTodos(keyword)`, `filterTodos(criteria)`
  - `rescheduleTodo(id, newDate, user)`

### `TodoService`
- **Vloga:** Poslovna logika za opravila.
- **Metode:** Enake kot v kontrolerju, vendar brez HTTP sloja.

### `TodoRepository`
- **Vloga:** Dostop do podatkovne baze opravil.
- **Ključne metode:**
  - `findAllByUser(user)`, `findByIdAndUser(id, user)`
  - `findByCompletedAndUser(...)`
  - `findByUserAndDueDateBetween(...)`
  - `findByUserAndKeyword(...)`

### `Todo` (entiteta)
- **Vloga:** Predstavlja posamezno opravilo.
- **Atributi:** Naslov, opis, status, datumi, uporabnik.
- **Metode:** Getterji in setterji.

---

## Obravnava napak

### `GlobalExceptionHandler`
- **Vloga:** Centralizirano ravnanje z napakami.
- **Metode:**
  - `handleValidationException(...)`
  - `handleGenericException(...)`

---

## Funkcionalna dinamika

1. Uporabnik preko `TodoClientApp` pošlje zahtevo (npr. sprememba roka).
2. Zahteva gre v `TodoController`, ki jo posreduje `TodoService`.
3. `TodoService` preveri pravice uporabnika in uporabi `TodoRepository` za dostop do podatkov.
4. Rezultat se vrne nazaj v frontend, kjer se prikaže uporabniku.

---







