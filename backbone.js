From: "Saved by Internet Explorer 11"
Subject: 
Date: Wed, 12 Aug 2015 15:07:38 -0700
MIME-Version: 1.0
Content-Type: text/html;
	charset="utf-8"
Content-Transfer-Encoding: quoted-printable
Content-Location: https://raw.githubusercontent.com/jsoma/tabletop/master/src/backbone.tabletopSync.js
X-MimeOLE: Produced By Microsoft MimeOLE V6.3.9600.17905

=EF=BB=BF<!DOCTYPE HTML>
<!DOCTYPE html PUBLIC "" ""><HTML><HEAD><META content=3D"IE=3D11.0000"=20
http-equiv=3D"X-UA-Compatible">

<META http-equiv=3D"Content-Type" content=3D"text/html; =
charset=3Dutf-8">
<META name=3D"GENERATOR" content=3D"MSHTML 11.00.9600.17924"></HEAD>
<BODY>
<PRE>/* =0A=
  A drop-in read-only Google-Spreadsheets-backed replacement for =
Backbone.sync=0A=
=0A=
  Tabletop must be successfully initialized prior to using fetch()=0A=
=0A=
  Backbone.tabletopSync only supports the 'read' method, and will fail=0A=
    loudly on any other operations=0A=
*/=0A=
=0A=
Backbone.tabletopSync =3D function(method, model, options, error) {=0A=
  // Backwards compatibility with Backbone &lt;=3D 0.3.3=0A=
  if (typeof options =3D=3D 'function') {=0A=
    options =3D {=0A=
      success: options,=0A=
      error: error=0A=
    };=0A=
  }=0A=
  =0A=
  var resp;=0A=
=0A=
  var tabletopOptions =3D model.tabletop || model.collection.tabletop;=0A=
=0A=
  var instance =3D tabletopOptions.instance;=0A=
=0A=
  if(typeof(instance) =3D=3D "undefined") {=0A=
    instance =3D Tabletop.init( { key: tabletopOptions.key,=0A=
                                wanted: [ tabletopOptions.sheet ],=0A=
                                wait: true } )=0A=
    tabletopOptions.instance =3D instance;=0A=
  } else {=0A=
    instance.addWanted(tabletopOptions.sheet);=0A=
  }=0A=
  =0A=
  if(typeof(tabletopOptions.sheet) =3D=3D "undefined") {=0A=
    return;=0A=
  }=0A=
  =0A=
  var sheet =3D instance.sheets( tabletopOptions.sheet );=0A=
=0A=
  if(typeof(sheet) =3D=3D=3D "undefined") {=0A=
    // Hasn't been fetched yet, let's fetch!=0A=
    =0A=
    // Let's make sure we aren't re-requesting a sheet that doesn't exist=0A=
    if(typeof(instance.foundSheetNames) !=3D=3D 'undefined' &amp;&amp; =
_.indexOf(instance.foundSheetNames, tabletopOptions.sheet) =3D=3D=3D -1) =
{=0A=
      throw("Can't seem to find sheet " + tabletopOptions.sheet);=0A=
    }=0A=
=0A=
    instance.fetch( function() {=0A=
      Backbone.tabletopSync(method, model, options, error);=0A=
    })=0A=
    return;=0A=
  }=0A=
  =0A=
  switch (method) {=0A=
    case "read":=0A=
      if(model.id) {=0A=
        resp =3D _.find( sheet.all(), function(item) {=0A=
          return model.id =3D=3D item[model.idAttribute];=0A=
        }, this);=0A=
      } else {=0A=
        resp =3D sheet.all();=0A=
      }=0A=
      break;=0A=
    default:=0A=
      throw("Backbone.tabletopSync is read-only");=0A=
  }=0A=
=0A=
  if (resp) {=0A=
    options.success(resp);=0A=
  } else {=0A=
    options.error("Record not found");=0A=
  }=0A=
=0A=
};</PRE></BODY></HTML>
