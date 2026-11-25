-- BOZZA da consegnare al responsabile del gestionale (mobilitas-backend/src/main/resources/db/migration/).
-- Rinumerare se nel frattempo sono uscite altre migration (al 25/11/2026 l'ultima è V621).
--
-- Heatmap interna del sito (docs/heatmap/SPEC.md del repo mobilitas-sito-web):
-- eventi grezzi di click e scroll inviati dal sito, più aggregati giornalieri per i periodi oltre i 90 giorni.
-- Nessun dato personale: niente IP, niente cookie, niente testo digitato. La sessione è un UUID casuale per scheda.

-- ---------------------------------------------------------------------------
-- Eventi grezzi (conservati 90 giorni)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS heatmap_eventi (
    id              BIGSERIAL PRIMARY KEY,
    pagina          VARCHAR(255) NOT NULL,
    tipo            VARCHAR(10)  NOT NULL,
    dispositivo     VARCHAR(10)  NOT NULL,
    viewport_w      SMALLINT,
    viewport_h      SMALLINT,
    doc_h           INTEGER,
    sessione        UUID         NOT NULL,
    pv              VARCHAR(16),
    versione        VARCHAR(40),
    -- click
    x_pct           NUMERIC(5,2),
    y_px            INTEGER,
    selettore       VARCHAR(500),
    el_x_pct        NUMERIC(5,2),
    el_y_pct        NUMERIC(5,2),
    etichetta       VARCHAR(80),
    fisso           BOOLEAN      NOT NULL DEFAULT FALSE,
    -- scroll
    scroll_max_pct  SMALLINT,
    durata_ms       INTEGER,
    avvenuto_il     TIMESTAMPTZ  NOT NULL DEFAULT now(),
    CONSTRAINT ck_heatmap_eventi_tipo        CHECK (tipo IN ('click', 'scroll')),
    CONSTRAINT ck_heatmap_eventi_dispositivo CHECK (dispositivo IN ('mobile', 'tablet', 'desktop'))
);

CREATE INDEX IF NOT EXISTS idx_heatmap_eventi_pagina_disp_data
    ON heatmap_eventi (pagina, dispositivo, avvenuto_il);
CREATE INDEX IF NOT EXISTS idx_heatmap_eventi_data
    ON heatmap_eventi (avvenuto_il);

-- ---------------------------------------------------------------------------
-- Aggregati giornalieri (conservati 24 mesi)
-- ---------------------------------------------------------------------------
-- Click: stesso raggruppamento dell'endpoint /api/heatmap/click (SPEC §4).
-- Per i click senza selettore: selettore = '' ed el_x/el_y = -1 (le PK non ammettono NULL).
CREATE TABLE IF NOT EXISTS heatmap_click_giorno (
    giorno       DATE         NOT NULL,
    pagina       VARCHAR(255) NOT NULL,
    dispositivo  VARCHAR(10)  NOT NULL,
    versione     VARCHAR(40)  NOT NULL DEFAULT '',
    selettore    VARCHAR(500) NOT NULL DEFAULT '',
    el_x         SMALLINT     NOT NULL DEFAULT -1,   -- el_x_pct arrotondato al 5
    el_y         SMALLINT     NOT NULL DEFAULT -1,   -- el_y_pct arrotondato al 5
    x            SMALLINT     NOT NULL,              -- x_pct arrotondato all'unità
    y            INTEGER      NOT NULL,              -- y_px arrotondato a 20 px
    fisso        BOOLEAN      NOT NULL DEFAULT FALSE,
    etichetta    VARCHAR(80),
    conteggio    INTEGER      NOT NULL,
    PRIMARY KEY (giorno, pagina, dispositivo, versione, selettore, el_x, el_y, x, y, fisso)
);

-- Scroll: visite il cui scroll massimo ha raggiunto almeno la fascia (0, 10 … 100).
CREATE TABLE IF NOT EXISTS heatmap_scroll_giorno (
    giorno       DATE         NOT NULL,
    pagina       VARCHAR(255) NOT NULL,
    dispositivo  VARCHAR(10)  NOT NULL,
    versione     VARCHAR(40)  NOT NULL DEFAULT '',
    fascia       SMALLINT     NOT NULL,
    visite       INTEGER      NOT NULL,
    PRIMARY KEY (giorno, pagina, dispositivo, versione, fascia)
);

-- Visite: per le KPI (visite, scroll medio, tempo medio) dei periodi aggregati.
CREATE TABLE IF NOT EXISTS heatmap_visite_giorno (
    giorno            DATE         NOT NULL,
    pagina            VARCHAR(255) NOT NULL,
    dispositivo       VARCHAR(10)  NOT NULL,
    versione          VARCHAR(40)  NOT NULL DEFAULT '',
    visite            INTEGER      NOT NULL,
    sessioni          INTEGER      NOT NULL,
    visite_con_click  INTEGER      NOT NULL,
    schermo_mediana   SMALLINT,               -- mediana di viewport_h del giorno
    scroll_somma_pct  BIGINT       NOT NULL,
    durata_somma_ms   BIGINT       NOT NULL,
    PRIMARY KEY (giorno, pagina, dispositivo, versione)
);

-- ---------------------------------------------------------------------------
-- Interruttori
-- ---------------------------------------------------------------------------
INSERT INTO config (chiave, valore, descrizione)
VALUES
    ('HEATMAP_RACCOLTA_ENABLED', 'TRUE',
     'Se TRUE, POST /api/sito/eventi salva gli eventi della heatmap inviati dal sito. Se FALSE risponde 204 senza salvare.'),
    ('JOB_HEATMAP_AGGREGA_ENABLED', 'TRUE',
     'Se TRUE, ogni notte alle 03:30 (Europe/Rome) aggrega gli eventi heatmap del giorno precedente in heatmap_*_giorno.'),
    ('JOB_HEATMAP_RETENTION_ENABLED', 'TRUE',
     'Se TRUE, ogni notte cancella heatmap_eventi più vecchi di 90 giorni e gli aggregati heatmap_*_giorno più vecchi di 24 mesi.')
ON CONFLICT (chiave) DO UPDATE SET
    descrizione = EXCLUDED.descrizione;
