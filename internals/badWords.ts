// spell-checker: disable
// adapted from https://github.com/tinwatchman/grawlix-racism/
/**
 * grawlix-racism
 * A plugin focused on replacing racial slurs with nonsense characters.
 *
 * WARNING: THIS PLUGIN DEALS DIRECTLY WITH TERMS THAT MANY FIND OFFENSIVE,
 * IMPOLITE, AND/OR DISTASTEFUL. AS SUCH, ALL SOURCE CODE SHOULD BE CONSIDERED
 * NSFW/NOT SAFE FOR WORK UNLESS OTHERWISE STATED. PLEASE READ THESE FILES AT
 * YOUR OWN RISK!
 *
 * @version 1.0.1
 */

interface FilterData {
  word: string;
  pattern: RegExp;
}

const FILTERS: FilterData[] = [
  /* N-word and variants */
  {
    word: "niggas",
    pattern: /n+[i1]+gg+[a@]+[s$z]+/i,
  },
  {
    word: "niggers",
    pattern: /n+[i1]+gg+e+r+[s$z]+/i,
  },
  {
    word: "nigga",
    pattern:
      /n+[\W023456789_]{0,42}[i1]+[\W023456789_]{0,42}g[\W\d_]{0,42}g+[\W\d_]{0,42}[a@]+(?!rd)/i,
  },
  {
    word: "nigger",
    pattern:
      /(\b|^|[^s])n+[\W02-9_]{0,42}[i1]+[\W02-9_]{0,42}g[\W\d_]{0,42}g+[\W0-24-9_]{0,42}[e3]+[\W0-24-9_]{0,42}r+/i,
  },
  {
    word: "migger",
    pattern: /m+[i1]+gg+[e3]+r+/i,
  },
  {
    word: "yigger",
    pattern: /y+[i1]+gg+[e3]+r+/i,
  },
  /* 'darkie' */
  {
    word: "darkies",
    pattern: /d+[a@]+r+k+[i1]+[e3]+s+/i,
  },
  {
    word: "darkie",
    pattern:
      /d+[\W\d_]{0,42}[a@]+[\W\d_]{0,42}r+[\W\d_]{0,42}k+[\W02-9_]{0,42}[i1]+[\W024-9_]{0,42}[e3]+/i,
  },
  /* shvatsa */
  {
    word: "shvatsas",
    pattern: /[s$z]+h+v+[a@]+t+[s$z]+[a@]+[s$z]+/i,
  },
  {
    word: "shvatsa",
    pattern: /[s$z]+h+v+[a@]+t+[s$z]+[a@]+/i,
  },
  /* spic */
  {
    word: "spics",
    pattern: /(\b|^)[s$]+p+[i1]+c+k{0,32}[s$]+/i,
  },
  {
    word: "spic",
    pattern:
      /(\b|^)[s$]+[\W\d_]{0,42}p+[\W02-9_]{0,42}[i1]+[\W02-9_]{0,42}c+(\b|$)/i,
  },
  /* wetback */
  {
    word: "wetbacks",
    pattern: /w+[e3]+t+b+[a@]+c+k+[s$z]+/i,
  },
  {
    word: "wetback",
    pattern: /w+[e3]+t+b+[a@]+c+k+/i,
  },
  /* kike */
  {
    word: "kikes",
    pattern: /k+[i1]+k+[e3]+[s$z]+/i,
  },
  {
    word: "kike",
    pattern:
      /k+[\W02-9_]{0,42}[i1]+[\W02-9_]{0,42}k+[\W0124-9_]{0,42}[e3]+(\b|$)/i,
  },
  /* gook */
  {
    word: "gooks",
    pattern:
      /g+[\W1-9_]{0,42}[o0][\W1-9_]{0,42}[o0]+[\W1-9_]{0,42}k+[\W\d_]{0,42}[s$]+/i,
  },
  {
    word: "gook",
    pattern:
      /(\b|^)g+[\W1-9_]{0,42}[o0][\W1-9_]{0,42}[o0]+[\W1-9_]{0,42}k+(?!y)/i,
  },
  /* raghead */
  {
    word: "ragheads",
    pattern: /r+[a@]+g+[\W\d_]{0,42}h+[e3]+[a@]+d+[s$]+/i,
  },
  {
    word: "raghead",
    pattern:
      /r+[\W\d_]{0,42}[a@]+[\W\d_]{0,42}g+[\W\d_]{0,42}h+[\W0-24-9_]{0,42}[e3]+[\W0-24-9_]{0,42}[a@]+[\W\d_]{0,42}d+/i,
  },
  /* towelhead */
  {
    word: "towelheads",
    pattern: /t+[o0]+w+[e3]+[l1]+[\W02-9_]{0,42}h+[e3]+[a@]+d+[s$]+/i,
  },
  {
    word: "towelhead",
    pattern:
      /t+[\W1-9_]{0,42}[o0]+[\W1-9_]{0,42}w+[\W0-24-9_]{0,42}[e3]+[\W024-9_]{0,42}[l1]+[\W02-9_]{0,42}h+[\W0-24-9_]{0,42}[e3]+[\W0-24-9_]{0,42}[a@]+[\W\d_]{0,42}d+/i,
  },
  /* injun */
  {
    word: "injuns",
    pattern: /[i1]+n+j+u+n+[s$]+/i,
  },
  {
    word: "injun",
    pattern:
      /[i1]+[\W02-9_]{0,42}n+[\W\d_]{0,42}j+[\W\d_]{0,42}u+[\W\d_]{0,42}n+(\b|$)/i,
  },
  /* squaw */
  {
    word: "squaws",
    pattern: /(\b|^)[s$]+q+u+[a@]+w+s+/i,
  },
  {
    word: "squaw",
    pattern: /(\b|^)[s$]+q+u+[a@]+w+(\b|$)/i,
  },
  /* wog, golliwog and variants */
  {
    word: "golliwogs",
    pattern: /g[o0][l1][l1][i1y]w[o0]g+[s$]/i,
  },
  {
    word: "golliwog",
    pattern: /g[o0][l1][l1][i1y]w[o0]g+/i,
  },
  {
    word: "wogs",
    pattern: /w+[\W1-9_]{0,42}[o0]+[\W1-9_]{0,42}g+[\W\d_]{0,42}[s$]+/i,
  },
  {
    word: "wog",
    pattern: /(\b|^)w+[\W1-9_]{0,42}[o0]+[\W1-9_]{0,42}g+(\b|$)/i,
  },
  /* kaffir (South African slur) and variants */
  {
    word: "kaffirs",
    pattern: /[ck][a@]ff[ie3]r[s$z]/i,
  },
  {
    word: "caffres",
    pattern: /[ck][a@]ffr[e3][s$z]/i,
  },
  {
    word: "caffre",
    pattern:
      /[ck][\W\d_]{0,42}[a@][\W\d_]{0,42}f[\W\d_]{0,42}f[\W\d_]{0,42}r[\W0-24-9_]{0,42}[e3]/i,
  },
  {
    word: "kaffir",
    pattern:
      /[ck]+[\W\d_]{0,42}[a@]+[\W\d_]{0,42}(?:f[\W024-9_]{0,42})+[i1e3]+[\W024-9_]{0,42}r+/i,
  },
  /* shitskin */
  {
    word: "shitskins",
    pattern: /[s$]h[i1]t[s$]k[i1]n[s$]/i,
  },
  {
    word: "shitskin",
    pattern: /[s$]h[i1]t[s$]k[i1]n/i,
  },
  /* latrino */
  {
    word: "latrinos",
    pattern: /[l1][a@]tr[i1]n[o0][s$z]/i,
  },
  {
    word: "latrino",
    pattern: /[l1][a@]tr[i1]n[o0]/i,
  },
  /* chinkerbell */
  {
    word: "chinkerbell",
    pattern: /ch[i1]nk[e3]rb[e3][l1][l1]+/i,
  },
  /* shvooga */
  {
    word: "shvoogas",
    pattern: /[s$]hv[o0][o0]g[a@][s$]/i,
  },
  {
    word: "shvooga",
    pattern: /[s$]hv[o0][o0]g[a@]/i,
  },
  /* negress */
  {
    word: "negress",
    pattern: /n[e3]gr[e3][s$z][s$z]+/i,
  },
  /* sambo */
  {
    word: "sambos",
    pattern: /[s$][a@]mb[o0][e3]*[s$]/i,
  },
  {
    word: "sambo",
    pattern:
      /[s$][\W\d_]{0,42}[a@][\W\d_]{0,42}m[\W\d_]{0,42}b[\W1-9_]{0,42}[o0]/i,
  },
];

export default function containsBadWord(str: string): boolean {
  for (const filter of FILTERS) {
    if (filter.pattern.test(str)) {
      return true;
    }
  }
  return false;
}
