type Kurs = {
    id: string;
    titel: string;
    beschreibung: string;
    schlachwoerter: string[];
    kontakt: Kontakt;
    ort: Ort;
    termine: {
        [id: number]: Termin;
    };
    maxanzahl: number;
    intern: boolean;
    permanentMembers: string[];
    interestedMembers: string[];
    uninterestedMembers: string[];
    zielgruppe: string[];
};

type Termin = {
    anmeldungen: string[],
    abmeldungen: string[],
    datum: Date;
};

type Kontakt = {
    email?: string;
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

type Ort = {
    name?: string;
    adresse: Adresse;
    barrierefrei?: boolean;
};