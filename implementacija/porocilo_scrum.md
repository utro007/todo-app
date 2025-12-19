# Scrum poročilo – Analiza produktivnega časa

## Izbrana uporabniška zgodba
Kot uporabnik želim videti analizo svojega produktivnega časa (npr. povprečno trajanje nalog, odstotek dokončanih nalog v določenem časovnem obdobju), da lahko bolje upravljam svoje delo.

## Razbitje uporabniške zgodbe
Uporabniško zgodbo smo razdelili na več manjših nalog, ki omogočajo postopno implementacijo analize produktivnosti uporabnika.

## Ocenjevanje nalog
Naloge smo ocenili z metodo planning poker. Kot mersko enoto smo uporabili story points.

## Pregled nalog
- T1 – Analiza zahtev (1 SP)
- T2 – Določitev metrik produktivnosti (1 SP)
- T3 – Načrt podatkovnega modela (2 SP)
- T4 – Backend logika za izračun statistike (3 SP)
- T5 – Filtriranje nalog po časovnem obdobju (2 SP)
- T6 – Priprava API vmesnika (2 SP)
- T7 – Prikaz analize na uporabniškem vmesniku (3 SP)
- T8 – Testiranje izračunov (2 SP)
- T9 – Dokumentacija (1 SP)

## Scrum proces
Napredek nalog bomo spremljali s pomočjo GitHub Projects agilne table (KANBAN metoda). Naloge bomo premikali med fazami Ready, In Progress in Done glede na trenutno stanje razvoja.


## Potek dela
- T1 Analiza zahtev - Uporabniško zgodbo smo podelili na manjše naloge ki smo jih pol po metodi KANBAN razreševali oz. implementirali v našo nalogo.
- T2 Določitev metrik produktivnosti - Zbrali smo katere statisktike hočemo računat in kateri vse podatki so nam za to potrebni.
- T3 Načrt podatkovnega modela - V modelu ToDo smo mogli dodat completedAt atribut smo lahko izračunali povprečen čas trajanja, ter s tem dodati potrebne setterje in getterje.
- T4/T5 Backend logika za izračun statistike in filtriranje po časovnem obdobju - UStvarili smo novi ProudctivityStatsDTO, od kod dobivamo podatke za statistiko ki jo bomo pol uporabljali. Tukaj smo spreminjali backend za ToDoController in ToDoService. V ToDoService smo dodali getProductivityStats in getProductivityStatsByPeriod, kjer je potekal izračun. V ToDoController pa smo nastavili API točko todos/stats in todos/stats/period, na katerih so dostopne vse statistike
- T6 Priprava API vmesnika- API vmesnik smo namestili že pri prejšnjih nalogah
- T7 Prikaz analize na uporabniškem vmesniku - za lažjo lotenje naloge smo razdelili T7 na T7.1 in T7.2 pri katerem je T7.1 bila točka pri kateri smo naredili tabelo za splošno statiskto, T7.2 pa točka pri kateri smo delali statistiko za določen čas. V bistvu smo samo naredili posodobitve v html-ju in script.js, kjer smo s pomočjo funkcije displayStats() in loadAllStats() prikazali statisktiko, ki smo jo klicali z prej navedenih API pointsov. 
- T8 Testiranje izračunov - Za lažjo obravnavo smo izbrisali vse naloge in ustvarili novi dve. Pustili smo jih nekaj časa da stojijo, kako bi isprobali če časovna metrika deluje. Pol, smo jih obkljukali kot dokončane da lahko preverimo če se bo statsika osvežila. Vse se posodobilo, tako bi moglo, saj smo tudi pregledali API pointse, ki kažejo isto statistiko. Slika: ![img.png](img.png)
- Pri testiranju smo naleteli na napako v server.js ki smo ju odpravili, tako da so vse druge funkcionalnosti pravilno delovale.

## Zaključek
Delo je potekalo po Scrum metodologiji (Metoda KANBAN) s poudarkom na razdelitvi uporabniške zgodbe, sprotnem spremljanju napredka na GitHubu.
