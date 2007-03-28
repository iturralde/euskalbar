// Developers: Asier Sarasua Garmendia 2006
//             Julen Ruiz Aizpuru 2007
// This is Free Software (GPL License)
// asarasua@vitoria-gasteiz.org
// julenx@gmail.com


    // Euskalterm kargatu
    function getShiftEuskalterm(source, term) {
      var txtEuskalterm= "";
      //Lokalizazio paketeak kargatu
      strRes = document.getElementById('leuskal');
      if (euskalbar_source == 'es') {
        idioma = 'G';
      } else if (euskalbar_source == 'en') {
        idioma = 'I';
      } else {
        idioma = 'E';
      }

      var urlEuskalterm = 'http://www1.euskadi.net/euskalterm/cgibila7.exe?hizkun1='+idioma+'&hitz1='+escape(term)+'&gaiak=0&hizkuntza='+source;
      var xmlHttpReq = new XMLHttpRequest();
      xmlHttpReq.overrideMimeType('text/xml; charset=ISO-8859-1');
      if (!xmlHttpReq) {
        txtEuskalterm = strRes.getString("m1Euskalterm");
        return false;
      }

      xmlHttpReq.open('GET', urlEuskalterm, true);
      xmlHttpReq.send(null);

      //Timerra sortu
      var requestTimer = setTimeout(function() {
        xmlHttpReq.abort();
        txtEuskalterm = strRes.getString("m1Euskalterm");
      }, 5000);

      xmlHttpReq.onreadystatechange = function() {
        try {
          if (xmlHttpReq.readyState == 4) {
            if (xmlHttpReq.status == 200) {
          	  //Timerra garbitu
          	  clearTimeout(requestTimer);
              txtEuskalterm = xmlHttpReq.responseText;
              txtEuskalterm = txtEuskalterm.replace(/<HTML>/, " ");
              txtEuskalterm = txtEuskalterm.replace(/<HEAD><TITLE>Fitxak<\/TITLE><\/HEAD>/, " ");
              txtEuskalterm = txtEuskalterm.replace(/<BODY  bgcolor=lavender leftmargin="10">/, "<strong><font face=\"bitstream vera sans, verdana, arial\" size=\"3\">"+term+"</font></strong>");
              txtEuskalterm = txtEuskalterm.replace(/<\/body><\/html>/, " ");
              txtEuskalterm = txtEuskalterm.replace(/steelblue/g, "black");
              txtEuskalterm = txtEuskalterm.replace(/Verdana/g, "\"bitstream vera sans, verdana, arial\"");
            } else {
              txtEuskalterm = strRes.getString("m1Euskalterm");
            }
          }
        } catch(e) {
          txtEuskalterm = strRes.getString("m1Euskalterm");
        }
      getBrowser().contentDocument.getElementById('aEuskalterm').innerHTML = txtEuskalterm;
      }
    }


    // Elhuyar kargatu
    function getShiftElhuyar(source, term){
      var txtElhuyar= "";
      //Lokalizazio paketeak kargatu
      strRes = document.getElementById('leuskal');
    
      //Azentu markak, e�eak eta dieresiak aldatu
      term = encodeURI(term);
      term = term.replace(/\%20/g, "_");
      term = term.replace(/\%C3\%A1/g, "a");
      term = term.replace(/\%C3\%A9/g, "e");
      term = term.replace(/\%C3\%AD/g, "i");
      term = term.replace(/\%C3\%B3/g, "o");
      term = term.replace(/\%C3\%BA/g, "u");
      term = term.replace(/\%C3\%B1/g, "nzz");
      term = term.replace(/\%C3\%BC/g, "u");
      term = term.replace(/\%C3\%81/g, "A");
      term = term.replace(/\%C3\%89/g, "E");
      term = term.replace(/\%C3\%8D/g, "I");
      term = term.replace(/\%C3\%93/g, "O");
      term = term.replace(/\%C3\%9A/g, "U");
      term = term.replace(/\%C3\%91/g, "NZZ");
      term = term.replace(/\%C3\%9C/g, "U");
    
      if (source == 'es') {
        var urlElhuyar = 'http://www1.euskadi.net/hizt_el/gazt.asp?Sarrera='+term;
      } else {
        var urlElhuyar = 'http://www1.euskadi.net/hizt_el/eusk.asp?Sarrera='+term;
      }
      var xmlHttpReq = new XMLHttpRequest();
      xmlHttpReq.overrideMimeType('text/xml; charset=ISO-8859-1');
      if (!xmlHttpReq) {
        txtElhuyar = strRes.getString("m1Elhuyar");
        return false;
      }
      xmlHttpReq.open('GET', urlElhuyar, true);
      xmlHttpReq.send(null);
    
      //Timerra sortu
      var requestTimer = setTimeout(function() {
        xmlHttpReq.abort();
        txtElhuyar = strRes.getString("m1Elhuyar");
      }, 5000);

      xmlHttpReq.onreadystatechange = function() {
        try {
          if (xmlHttpReq.readyState == 4) {
            if (xmlHttpReq.status == 200) {
          	  //Timerra garbitu
          	  clearTimeout(requestTimer);
              txtElhuyar = xmlHttpReq.responseText;
              var txtElhuyartable1array = txtElhuyar.split("<table");
              txtElhuyar = txtElhuyartable1array[1].substring(txtElhuyartable1array[1].lenght - 1);
              txtElhuyar = '<table'+txtElhuyar;
              var txtElhuyartr1array = txtElhuyar.split("<tr");
              txtElhuyar = txtElhuyartr1array[2].substring(txtElhuyartr1array[2].lenght - 1);
              txtElhuyar = '<p><tr'+txtElhuyar;
              txtElhuyar = txtElhuyar.replace(/<\/table>/, " ");
              txtElhuyar = txtElhuyar.replace(/009999/g, "  ");
              txtElhuyar = txtElhuyar.replace(/FFFFFF/g, "000000");
              txtElhuyar = txtElhuyar.replace(/003399/g, "000000");
              txtElhuyar = txtElhuyar.replace(/Arial, Helvetica, sans-serif/g, "bitstream vera sans, verdana, arial");
              txtElhuyar = txtElhuyar.replace(/Times New Roman, Times, serif/g, "bitstream vera sans, verdana, arial");
              txtElhuyar = txtElhuyar.replace(/azpisarrera/g, "http://www1.euskadi.net/hizt_el/azpisarrera");
            } else {
          	  //Hitza aurkitzen ez bada, beste funtzio hau exekutatu
          	  getShiftElhuyarAlt1(source, term);
            }
          }
        } catch(e) {
          txtElhuyar = strRes.getString("m1Elhuyar");
        }
        getBrowser().contentDocument.getElementById('aElhuyar').innerHTML = txtElhuyar;
      }
    }


    // Elhuyar kargatu hitzak sarrera bat baino gehiago duenean (adib: "cola" hitza): lehen sarrera
    function getShiftElhuyarAlt1(source, term){
      var txtElhuyar = "";
      //Lokalizazio paketeak kargatu
      strRes = document.getElementById('leuskal');
      if (source == 'es') {
        var urlElhuyar = 'http://www1.euskadi.net/hizt_el/gazt.asp?Sarrera='+term+'%20%201';
      } else {
        var urlElhuyar = 'http://www1.euskadi.net/hizt_el/eusk.asp?Sarrera='+term+'%20%201';
      }
      var xmlHttpReq = new XMLHttpRequest();
      xmlHttpReq.overrideMimeType('text/xml; charset=ISO-8859-1');
      if (!xmlHttpReq) {
        txtElhuyar = strRes.getString("m1Elhuyar");
        return false;
      }
      xmlHttpReq.open('GET', urlElhuyar, true);
      xmlHttpReq.send(null);

      //Timerra sortu
      var requestTimer = setTimeout(function() {
        xmlHttpReq.abort();
        txtElhuyar = strRes.getString("m1Elhuyar");
      }, 5000);

      xmlHttpReq.onreadystatechange = function() {
        try {
          if (xmlHttpReq.readyState == 4) {
            if (xmlHttpReq.status == 200) {
          	  //Timerra garbitu
          	  clearTimeout(requestTimer);
              txtElhuyar = xmlHttpReq.responseText;
              var txtElhuyartable1array = txtElhuyar.split("<table");
              txtElhuyar = txtElhuyartable1array[1].substring(txtElhuyartable1array[1].lenght - 1);
              txtElhuyar = '<table'+txtElhuyar;
              var txtElhuyartr1array = txtElhuyar.split("<tr");
              txtElhuyar = txtElhuyartr1array[2].substring(txtElhuyartr1array[2].lenght - 1);
              txtElhuyar = '<p><tr'+txtElhuyar;
              txtElhuyar = txtElhuyar.replace(/<\/table>/, " ");
              txtElhuyar = txtElhuyar.replace(/009999/g, "  ");
              txtElhuyar = txtElhuyar.replace(/FFFFFF/g, "000000");
              txtElhuyar = txtElhuyar.replace(/003399/g, "000000");
              txtElhuyar = txtElhuyar.replace(/Arial, Helvetica, sans-serif/g, "bitstream vera sans, verdana, arial");
              txtElhuyar = txtElhuyar.replace(/Times New Roman, Times, serif/g, "bitstream vera sans, verdana, arial");
              txtElhuyar = txtElhuyar.replace(/azpisarrera/g, "http://www1.euskadi.net/hizt_el/azpisarrera");
              getBrowser().contentDocument.getElementById('aElhuyar').innerHTML = txtElhuyar;
    	  getShiftElhuyarAlt2(source, term);
            }
          } else {
            if (source=='es') {
              txtElhuyar = 'No se ha encontrado la palabra '+term+'.';
            } else {
              txtElhuyar = 'Ez da aurkitu '+term+' hitza.';
            }
          getBrowser().contentDocument.getElementById('aElhuyar').innerHTML = txtElhuyar;
          }
        } catch(e) {
          txtElhuyar = strRes.getString("m1Elhuyar");
        }
      }
    }


    // Elhuyar kargatu hitzak sarrera bat baino gehiago duenean (adib: "cola" hitza): bigarren sarrera
    function getShiftElhuyarAlt2(source, term){
      var txtElhuyar = "";
      //Lokalizazio paketeak kargatu
      strRes = document.getElementById('leuskal');
      if (source == 'es') {
        var urlElhuyar = 'http://www1.euskadi.net/hizt_el/gazt.asp?Sarrera='+term+'%20%202';
      } else {
        var urlElhuyar = 'http://www1.euskadi.net/hizt_el/eusk.asp?Sarrera='+term+'%20%202';
      }
      var xmlHttpReq = new XMLHttpRequest();
      xmlHttpReq.overrideMimeType('text/xml; charset=ISO-8859-1');
      if (!xmlHttpReq) {
        txtElhuyar = strRes.getString("m1Elhuyar");
        return false;
      }
      xmlHttpReq.open('GET', urlElhuyar, true);
      xmlHttpReq.send(null);

      //Timerra sortu
      var requestTimer = setTimeout(function() {
        xmlHttpReq.abort();
        txtElhuyar = strRes.getString("m1Elhuyar");
      }, 5000);

      xmlHttpReq.onreadystatechange = function() {
        try {
          if (xmlHttpReq.readyState == 4) {
            if (xmlHttpReq.status == 200) {
              //Timerra garbitu
              clearTimeout(requestTimer);
              txtElhuyar = xmlHttpReq.responseText;
              var txtElhuyartable1array = txtElhuyar.split("<table");
              txtElhuyar = txtElhuyartable1array[1].substring(txtElhuyartable1array[1].lenght - 1);
              txtElhuyar = '<table'+txtElhuyar;
              var txtElhuyartr1array = txtElhuyar.split("<tr");
              txtElhuyar = txtElhuyartr1array[2].substring(txtElhuyartr1array[2].lenght - 1);
              txtElhuyar = '<p><tr'+txtElhuyar;
              txtElhuyar = txtElhuyar.replace(/<\/table>/, " ");
              txtElhuyar = txtElhuyar.replace(/009999/g, "  ");
              txtElhuyar = txtElhuyar.replace(/FFFFFF/g, "000000");
              txtElhuyar = txtElhuyar.replace(/003399/g, "000000");
              txtElhuyar = txtElhuyar.replace(/Arial, Helvetica, sans-serif/g, "bitstream vera sans, verdana, arial");
              txtElhuyar = txtElhuyar.replace(/Times New Roman, Times, serif/g, "bitstream vera sans, verdana, arial");
              txtElhuyar = txtElhuyar.replace(/azpisarrera/g, "http://www1.euskadi.net/hizt_el/azpisarrera");
    	  //Lehen sarrerari bigarren sarrera erantsi
              getBrowser().contentDocument.getElementById('aElhuyar').innerHTML = getBrowser().contentDocument.getElementById('aElhuyar').innerHTML+txtElhuyar;
    	  getShiftElhuyarAlt3(source, term);
            }
          }
        }
        catch(e) {
          txtElhuyar = strRes.getString("m1Elhuyar");
        }
      }
    }


    //Elhuyar kargatu hitzak sarrera bat baino gehiago duenean (adib: "cola" hitza): hirugarren sarrera
    function getShiftElhuyarAlt3(source, term) {
      var txtElhuyar = "";
      //Lokalizazio paketeak kargatu
      strRes = document.getElementById('leuskal');
      if (source == 'es') {
        var urlElhuyar = 'http://www1.euskadi.net/hizt_el/gazt.asp?Sarrera='+term+'%20%203';
      } else {
        var urlElhuyar = 'http://www1.euskadi.net/hizt_el/eusk.asp?Sarrera='+term+'%20%203';
      }
      var xmlHttpReq = new XMLHttpRequest();
      xmlHttpReq.overrideMimeType('text/xml; charset=ISO-8859-1');
      if (!xmlHttpReq) {
        txtElhuyar = strRes.getString("m1Elhuyar");
        return false;
      }
      xmlHttpReq.open('GET', urlElhuyar, true);
      xmlHttpReq.send(null);
      //Timerra sortu
      var requestTimer = setTimeout(function() {
        xmlHttpReq.abort();
        txtElhuyar = strRes.getString("m1Elhuyar");
      }, 5000);
      xmlHttpReq.onreadystatechange = function() {
        try {
          if (xmlHttpReq.readyState == 4) {
            if (xmlHttpReq.status == 200) {
    	  //Timerra garbitu
    	  clearTimeout(requestTimer);
              txtElhuyar = xmlHttpReq.responseText;
              var txtElhuyartable1array = txtElhuyar.split("<table");
              txtElhuyar = txtElhuyartable1array[1].substring(txtElhuyartable1array[1].lenght - 1);
              txtElhuyar = '<table'+txtElhuyar;
              var txtElhuyartr1array = txtElhuyar.split("<tr");
              txtElhuyar = txtElhuyartr1array[2].substring(txtElhuyartr1array[2].lenght - 1);
              txtElhuyar = '<p><tr'+txtElhuyar;
              txtElhuyar = txtElhuyar.replace(/<\/table>/, " ");
              txtElhuyar = txtElhuyar.replace(/009999/g, "  ");
              txtElhuyar = txtElhuyar.replace(/FFFFFF/g, "000000");
              txtElhuyar = txtElhuyar.replace(/003399/g, "000000");
              txtElhuyar = txtElhuyar.replace(/Arial, Helvetica, sans-serif/g, "bitstream vera sans, verdana, arial");
              txtElhuyar = txtElhuyar.replace(/Times New Roman, Times, serif/g, "bitstream vera sans, verdana, arial");
              txtElhuyar = txtElhuyar.replace(/azpisarrera/g, "http://www1.euskadi.net/hizt_el/azpisarrera");
              //Lehen bi sarrerei hirugarren sarrera erantsi
              getBrowser().contentDocument.getElementById('aElhuyar').innerHTML = getBrowser().contentDocument.getElementById('aElhuyar').innerHTML+txtElhuyar;
            }
          }
        } catch(e) {
          txtElhuyar = strRes.getString("m1Elhuyar");
        }
      }
    }



    // 3000 kargatu
    function getShift3000(source, term){
      var txt3000 = "";
      //Lokalizazio paketeak kargatu
      strRes = document.getElementById('leuskal');
    
      if (source == 'es') {
        source = 'CAS'; idioma = 'Castellano';
      } else{
        source = 'EUS'; idioma = 'Euskera';
      }
    
      var url3000='http://www1.euskadi.net/cgi-bin_m33/DicioIe.exe?Diccionario='+source+'&Idioma='+source+'&Txt_'+idioma+'='+escape(term);
      var xmlHttpReq = new XMLHttpRequest();
      xmlHttpReq.overrideMimeType('text/xml; charset=ISO-8859-1');
      if (!xmlHttpReq) {
        txt3000 = strRes.getString("m13000");
        return false;
      }
    
      xmlHttpReq.open('GET', url3000, true);
      xmlHttpReq.send(null);
    
      //Timerra sortu
      var requestTimer = setTimeout(function() {
        xmlHttpReq.abort();
        txt3000 = strRes.getString("m13000");
      }, 5000);
    
      xmlHttpReq.onreadystatechange = function() {
        try {
          if (xmlHttpReq.readyState == 4) {
    	//Timerra garbitu
    	clearTimeout(requestTimer);
            if (xmlHttpReq.status == 200) {
              txt3000 = xmlHttpReq.responseText;
              var wtable = 3;
              if (txt3000.match("No se ha encontrado")) {
                wtable = 2;
                txt3000 = "No se ha encontrado la palabra "+term+".";
              } else if (txt3000.match("ez da aurkitu")) {
                wtable = 2;
                txt3000 = term +" hitza ez da aurkitu.";
              } else {
                var txt3000table1array = txt3000.split("<TABLE");
                txt3000 = txt3000table1array[wtable].substring(txt3000table1array[wtable].lenght - 1);
                var txt3000table2array = txt3000.split("<\/TABLE>");;
                txt3000 = txt3000table2array[0].substring(txt3000table2array[0].lenght - 1);
                txt3000 = '<TABLE'+txt3000+'<\/TABLE>';
                txt3000 = txt3000.replace(/FFFFCC/g, " ");
                txt3000 = txt3000.replace(/font-size: 20pt/, "font-size: 12pt");
                txt3000 = txt3000.replace(/0000A0/g, "000000");
                txt3000 = txt3000.replace(/center/g, "left");
              }
            } else {
               txt3000 = strRes.getString("m13000");
            }
          }
        } catch(e) {
          txt3000 = strRes.getString("m13000");
        }
        getBrowser().contentDocument.getElementById('a3000').innerHTML = txt3000;
      }
    }


    // Morris hiztegia kargatu
    function getShiftMorris(source, term) {
      var txtMorris = "";
      //Lokalizazio paketeak kargatu

      if (source == 'en') {
        hizk = 'txtIngles';
      } else {
        hizk = 'txtEuskera';
      }
      // POST bidez pasatzeko parametroak
      var parametroak = hizk+'='+escape(term);
      var urlMorris = 'http://www1.euskadi.net/morris/resultado.asp';
      var xmlHttpReq = new XMLHttpRequest();
      xmlHttpReq.overrideMimeType('text/xml; charset=ISO-8859-1');
      if (!xmlHttpReq) {
        txtMorris = strRes.getString("m1Morris");
        return false;
      }
      xmlHttpReq.open('POST', urlMorris, true);
      // Beharrezkoa web zerbitzariak jakin dezan zer bidaltzen dugun 
      xmlHttpReq.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
      xmlHttpReq.setRequestHeader("Content-length", parametroak.length);
      xmlHttpReq.send(parametroak);
      //Timerra sortu
        xmlHttpReq.abort();
        txtMorris = strRes.getString("m1Morris");
      }, 5000);

      xmlHttpReq.onreadystatechange = function() {
        try {
          div = getBrowser().contentDocument.getElementById('aMorris');
          if (xmlHttpReq.readyState == 4) {
            // Timerra garbitu
            if (xmlHttpReq.status == 200) {
              txtMorris = xmlHttpReq.responseText;
              if (txtMorris.match("Barkatu, baina sarrera hau ez dago hiztegian")) {
                txtMorris = "Ez da aurkitu "+term+" hitza.";
              } else {
                var txtMorrisTable1 = txtMorris.split("<hr>");
                txtMorris = txtMorrisTable1[1].slice(0, txtMorrisTable1[1].lastIndexOf("<table"));
                txtMorris = txtMorris.replace(/images/g, "http://www1.euskadi.net/morris/images");
                txtMorris = txtMorris.replace(/datuak/g, "http://www1.euskadi.net/morris/datuak");
                txtMorris = txtMorris.replace(/font-size: 8pt/g, "font-size: 12pt");
                txtMorris = txtMorris.replace(/font-size:11ptl/g, "font-size: 12pt");
                txtMorris = txtMorris.replace(/color:green/g, "color: #000000");
                txtMorris = txtMorris.replace(/font-family:Arial, Helvetica, sans-serif/g, "font-family:bitstream vera sans, verdana, arial");
                txtMorris = txtMorris.replace(/width="550"/g, "");
                txtMorris = txtMorris.replace(/width="150"/g, "");
              }
            } else {
              txtMorris = strRes.getString("m1Morris");
            }
          }
        } catch(e) {
          txtMorris = strRes.getString("m1Morris");
        }
        getBrowser().contentDocument.getElementById('aMorris').innerHTML = txtMorris;
      }
    
    }