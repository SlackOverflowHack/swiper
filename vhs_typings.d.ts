type Veranstaltung = {
    intern: boolean;
    tags: string[];
    guid: string;
    nummer: string;
    name: string;
    untertitel?: string;
    dvv_kategorie: Kategorie;
    level?: string;
    minimale_teilnehmerzahl?: number;
    maximale_teilnehmerzahl?: number;
    aktuelle_teilnehmerzahl?: number;
    anzahl_termine?: number;
    beginn_datum: Date;
    dauer?: number;
    ende_datum?: Date;
    wochentag?: Wochentag[];
    zielgruppe?: string[];
    schlagwort?: string[];
    zertifikat?: Zertifikat[];
    text: TnsText[];
    veranstaltungsort: Ort;
    termin?: Termin;
    preis?: Preis;
    dozent?: Kontakt;
    webadresse: Webaddresse[];
};

type Webaddresse = {
    uri: string;
    name?: string;
    typ: 'website' | 'website_mobile' | 'attachent' | 'picture' | 'video';
};

type Termin = {
    beginn_datum: Date;
    beginn_uhrzeit?: string;
    ende_uhrzeit?: string;
};

type Preis = {
    betrag: number;
    rabatt_moeglich?: boolean;
    zusatz?: string;
};

type Ort = {
    name?: string;
    adresse: Adresse;
    barrierefrei?: boolean;
};

type TnsText = {
    eigenschaft: string;
    text?: string;
};

type Zertifikat = {
    name: string;
    text: string;
};

type Wochentag = 'Montag' | 'Dienstag' | 'Mittwoch' | 'Donnerstag' | 'Freitag' | 'Samstag' | 'Sonntag';

type Kategorie = {
    version: string;
};

type Kontakt = {
    guid?: string;
    anrede?: string;
    titel?: string;
    name?: string;
    vorname?: string;
};

type Adresse = {
    land: string;
    plz: string;
    ort: string;
    ortsteil?: string;
    strasse: string;
};