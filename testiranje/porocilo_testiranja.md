# Poročilo o testiranju

## 1. Opis testov

Izvedba unit testiranja za funkcionalnost koledarskega prikaza nalog po mesecih.

### 1.1. TodoServiceCalendarTest

Testni razred `TodoServiceCalendarTest` testira metodo `getTodosByMonth()` v `TodoService` razredu, ki je odgovoren za koledarskegi prikaz.

**Uporabljene anotacije:**
- `@ExtendWith(MockitoExtension.class)` - Omogoča uporabo Mockito za dependency injection in mock objekte
- `@Mock` - Ustvari mock objekt za TodoRepository
- `@InjectMocks` - Inicializira TodoService z mock repozitorijem
- `@BeforeEach` - Izvede se pred vsakim testom za inicializacijo
- `@Test` - Označuje testno metodo
- `@DisplayName` - Omogoča opisno ime testa

**Testirane funkcionalnosti:**

1. **Test za primer, ko ni nalog za določen mesec**
   - Preverja, da metoda pravilno vrača prazen seznam, ko ni nalog za določen mesec
   - Aplikacija mora pravilno obravnavati primere, ko uporabnik nima nalog v določenem mesecu
   - Test preverja, da se vrača prazen seznam in ne null vrednost

2. **Test za primer z več nalogami v istem mesecu**
   - Preverja, da metoda pravilno vrača vse naloge, če jih je več v istem mesecu
   - Aplikacija mora prikazati vse naloge uporabnika za izbrani mesec
   - Test preverja, da se vračajo vse naloge in da imajo pravilne podatke

**Pozitivni scenariji:**
- Test za primer z več nalogami v istem mesecu - preverja, da se vračajo vse naloge

**Negativni scenariji:**
- Test za primer, ko ni nalog za določen mesec - preverja, da se vrača prazen seznam namesto null

### 1.2. TodoServiceDeleteTest

Testni razred `TodoServiceDeleteTest` testira metodo `deleteTodo()` v razredu
`TodoService`, ki skrbi za brisanje nalog glede na ID.

**Uporabljene anotacije:**
- `@ExtendWith(MockitoExtension.class)` – omogoča uporabo Mockito
- `@Mock` – mock repozitorija TodoRepository
- `@InjectMocks` – injiciranje mock objekta v TodoService
- `@BeforeEach` – inicializacija pred vsakim testom
- `@Test` – označuje testno metodo
- `@DisplayName` – opisno ime testa

**Testirane funkcionalnosti:**

1. **Brisanje obstoječe naloge**
   - Preverja, da metoda vrne `true`, kadar naloga obstaja
   - Preverja, da se metoda `deleteById()` dejansko pokliče
   - Pomembno za zagotavljanje pravilnega brisanja podatkov

2. **Brisanje neobstoječe naloge**
   - Preverja, da metoda vrne `false`, kadar naloga ne obstaja
   - Preverja, da se brisanje ne izvede
   - Preprečuje napake in neželene posege v bazo

**Pozitivni scenariji:**
- Brisanje obstoječe naloge

**Negativni scenariji:**
- Poskus brisanja neobstoječe naloge


## 2. Imena članov skupine in odgovornosti

**Razdelitev dela:**
- [Aljaž] - Odgovoren za implementacijo unit testov za Koledar
- [Omar] - Odgovoren za implementacijo unit testov za brisanje nalog

## 3. Analiza uspešnosti testov

### 3.1. Rezultati testiranja

Testi so bili uspešno izvedeni. Implementiran je bil en testni razred:

1. **TodoServiceCalendarTest** - 2 testni metodi
2. **TodoServiceDeleteTest** - 2 testni metodi



### 3.2. Odkrite napake in odpravljanje

Med testiranjem ni bilo napak v implementaciji koledarske funkcionalnosti. Vsi testi so potekli uspešno, kar pomeni, da:

- Metoda pravilno obravnava primer, ko ni nalog za določen mesec(vrača prazen seznam)
- Metoda pravilno vrača vse naloge, ko jih je več v istem mesecu

Testi za brisanje nalog so potrdili, da:
- Aplikacija pravilno izbriše nalogo, kadar ta obstaja
- Aplikacija varno obravnava primer, ko naloga ne obstaja, brez napak

