/* Lokale Speicherstände (localStorage): aktiver Run + permanente Freischaltungen (Archetypen/Stats). */
'use strict';
var FFD20 = FFD20 || {};
FFD20.Save = (function () {
  var RUN_KEY = 'ffd20_run_v1', META_KEY = 'ffd20_meta_v1';
  function saveRun(c) { try { localStorage.setItem(RUN_KEY, JSON.stringify(c)); } catch (e) {} }
  function loadRun() { try { var s = localStorage.getItem(RUN_KEY); return s ? JSON.parse(s) : null; } catch (e) { return null; } }
  function clearRun() { try { localStorage.removeItem(RUN_KEY); } catch (e) {} }
  function meta() { try { return JSON.parse(localStorage.getItem(META_KEY)) || { runs: 0, kills: 0, bosses: 0, archetypes: [], wins: 0 }; } catch (e) { return { runs: 0, kills: 0, bosses: 0, archetypes: [], wins: 0 }; } }
  function saveMeta(m) { try { localStorage.setItem(META_KEY, JSON.stringify(m)); } catch (e) {} }
  // Archetyp-Freischaltung: durch Spielen der Basisklasse (MVP: ab Klassenstufe 3 der Basisklasse).
  function checkArchetypeUnlock(char) {
    var m = meta(), changed = false;
    Object.keys(char.classes).forEach(function (cid) {
      var key = cid + ':squire';
      if (char.classes[cid].level >= 3 && m.archetypes.indexOf(key) < 0) { m.archetypes.push(key); changed = true; }
    });
    if (changed) saveMeta(m);
    return m;
  }
  return { saveRun: saveRun, loadRun: loadRun, clearRun: clearRun, meta: meta, saveMeta: saveMeta, checkArchetypeUnlock: checkArchetypeUnlock };
})();
