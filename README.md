# AssemblerStudioWeb
Run it online: [tim-greller.de/asw](https://tim-greller.de/asw/)

_______________

# Assemblerprogrammierung: Grundlagen und Umsetzung im AssemblerStudioWeb

## 1. Rechnerarchitektur: Der von-Neumann-Rechner

Programme befinden sich (wie die zu bearbeitenden Daten) im Speicher des Rechners. Die Rechnerstruktur ist dadurch universal einsetzbar.

Die fünf Grundeinheiten des Rechners:

- ALU (=Arithmetic Logic Unit) / Rechenwerk: arithmetische & logische Operationen auf den Daten
- Control Unit / Steuerwerk: Koordination & Steuerung der Komponenten; Bearbeitung der Programmanweisungen
- Speicherwerk: Speicher für Programme & Daten; In fortlaufend nummerierte (Speicheradresse) Speicherzellen unterteilt
- Eingabewerk: ermöglicht die Eingabe in den Speicher
- Ausgabewerk: gibt Daten aus dem Speicher nach außen

## 2. Aufbau einer einfachen Registermaschine
Die Zentraleinheit einer Registermaschine besteht neben Rechen- und Steuerwerk aus folgenden Registern:  
(Register = schnelle Hilfsspeicherzelle)

- Akkumulator: Register zum Speichern einer Ganzzahl
- Befehlszählerregister: Speicheradresse des nächsten Befehls
- Befehlsregister: Aktueller Befehl
- Statusregister: Jedes Bit des Registers hat als Flag eine bestimmte Bedeutung, z.B.:
    - N-Flag: Wert der letzten Rechenoperation war negativ
    - Z-Flag: Wert der letzten Rechenoperation war Null (zero)
    - O-Flag: Ein Überlauf (overflow) ist aufgetreten (=Ergebnis zu groß für den Speicherplatz)  

Diese vier Register sind auch im AssemblerStudioWeb vorhanden und auf der linken Seite oben zu finden. Sie werden, ihrer eben beschriebenen Funktion gemäß, vom ASW (AssemblerStudioWeb) automatisch gesetzt, können aber teilweise auch manuell bearbeitet werden.


## 3. Befehlssatz einer 1-Adress-Registermaschine

Ein Befehl besteht aus zwei Teilen: dem Operations- und dem Operandenteil. Der Operationsteil gibt die auszuführende Operation an und steht im ASW in der jeweils ersten Speicherzelle jeder Zeile. Die zweite Speicherzelle beinhaltet im ASW den Operandenteil, der stets eine Ganzzahl ist und entweder einen Wert oder eine Speicheradresse repräsentiert.

Für viele Befehle werden zwei Operanden benötigt. Bei 1-Adress-Registermaschinen ist aber nur einer davon im Operandenteil eines Befehls gegeben. Aus diesem Grund stellt der Akkumulator den ersten und der Operandenteil des Befehls den zweiten Operanden dar.

Die Befehle, die im ASW in vier Kategorien unterteilt sind, werden im Folgenden kurz erklärt:

- Transportbefehle
    - LOAD: Laden eines Wertes aus einer Speicherzelle in den Akkumulator (Speicheradresse des zu ladenden Wertes wird als Operand angegeben)
    - LOADI: Direktes Laden eines Wertes in den Akkumulator (Wert wird als Operand angegeben)
    - STORE: Schreiben des Akkumulatorwertes in eine Speicherzelle (Speicheradresse als Operand)
- Arithmetische Befehle
    - ADD: Der Wert einer Speicherzelle wird auf den Akkumulatorwert addiert
    - ADDI: Ein direkt definierter Wert wird auf den Akkumulatorwert addiert
    - SUB: Der Wert einer Speicherzelle wird vom Akkumulatorwert subtrahiert
    - SUBI: Ein direkt definierter Wert wird vom Akkumulatorwert subtrahiert
    - MUL: Der Akkumulatorwert wird um den Wert einer Speicherzelle vervielfacht
    - MULI: Der Akkumulatorwert wird um einen direkt definierten Wert vervielfacht
    - DIV: Der Akkumulatorwert wird durch den Wert einer Speicherzelle dividiert
    - DIVI: Der Akkumulatorwert wird durch einen direkt definierten Wert dividiert
- Sprungbefehle
    - JUMP: Definiert die Speicheradresse des nächsten auszuführenden Befehls
    - JUMPZ: Definiert die Speicheradresse des nächsten auszuführenden Befehls, wenn der Akkumulator 0 ist
    - JUMPP: Definiert die Speicheradresse des nächsten auszuführenden Befehls, wenn der Akkumulator positiv ist
    - JUMPN: Definiert die Speicheradresse des nächsten auszuführenden Befehls, wenn der Akkumulator negativ ist
- Sonstige Befehle
    - HOLD: Beendet die Programmabarbeitung

## 4. Befehlszyklus einer Registermaschine

Die Abarbeitung der einzelnen Befehle orientiert sich an einem festen Schema, das für jeden Befehl wiederholt wird, bis das Programm durch `hold` beendet wird. Die dafür typischen Schritte werden auch vom ASW ausgeführt.

1. Fetch: Der Operator wird aus dem Speicher geholt
2. Decode: Der Operator wird decodiert
3. Fetch Operand: Der Operand wird aus dem Speicher geholt
4. Execute: Der Befehl wird ausgeführt
5. Update Instruction Pointer: Der Befehlszähler wird erhöht

## 5. Assemblerprogramme im ASW
### 5.1 Schreiben
Ein Programm beginnt in der ersten Speicherzelle des Speichers an der rechten Seite des ASWs. Durch Klicken/Anwählen dieser Speicherzelle können Sie mit dem Schreiben des Programms beginnen. Die Befehle und ihre Funktionsweise müssen Sie sich nicht merken, da sie alle links als Buttons aufgeführt sind (Erklärungen werden als Tooltip beim hovern über einen Button angezeigt). Durch drücken eines der Buttons, wird der Befehl in die ausgewählte Speicherzelle eingefügt und die Speicherzelle des zugehörigen Operanden ausgewählt. Haben Sie den Operanden durch eine Ganzzahl definiert, können Sie direkt den Button des nächsten Befehls drücken, der daraufhin automatisch in die folgende Speicheradresse eingefügt wird.

Zu verarbeitende Daten werden in den selben Speicher, für gewöhnlich nach dem Programmcode, eingegeben (oder vom ASW durch STORE geschrieben). Sollte Ihr Programm mehr als 40 Speicherzellen benötigen, können Sie mit dem Button "Add Cells" neue Speicherzellenpaare hinzufügen.



### 5.2 Ausführen
Zum Ausführen Ihres Programms dienen die vier Buttons in der oberen linken Ecke:

- RUN: Startet die Programmabarbeitung, die bis zum Befehl `HOLD` ausgeführt wird.
- HOLD: Gibt Ihnen die Möglichkeit das Programm manuell zu beenden, ohne dass der HOLD-Befehl erreicht wird.
- STEP: Führt nur den nächsten Schritt, also einen Befehlszyklus, aus. Damit können Sie Ihr Programm langsam durchgehen, um z.B. Fehler zu finden.
- RESET: Setzt die Registerwerte zurück, sodass das Programm im Speicher erneut ausgeführt werden kann.

### 5.3 Importieren und Exportieren: Speichern und Laden Ihrer Programme
Mit der Exportfunktion, die Sie mit dem Button "Export" unter den Speicherzellen starten, können Sie Ihr sich aktuell im Speicher befindliches Programm in Form einer Textdatei exportieren. Diese Textdatei können Sie natürlich dann mit externen Editoren beliebig bearbeiten.

Um ein exportiertes Programm wieder in den Speicher zu importieren, wählen Sie die zu ladende Datei im Import-Feld aus oder ziehen Sie die Datei auf dieses Feld.

Einige Beispielprogramme, die Sie importieren können, sind bereits im [examples](/examples) Ordner enthalten.
