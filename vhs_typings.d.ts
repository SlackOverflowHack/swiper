type Kurs = {
    id: string;
    titel: string;
    beschreibung: string;
    schlachwoerter: string[];
    permMember: string[];
    kontakt: Kontakt;
    ort: Ort;
    termine: {
        [id: string]: Termin;
    };
    maxanzahl: number;
    intern: boolean;
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