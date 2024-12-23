from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Datenbankkonfiguration
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://user:password@localhost/wohnungsverwaltung'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Datenbankmodelle
class Wohnung(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    adresse = db.Column(db.String(255), nullable=False)
    groesse = db.Column(db.Float, nullable=False)
    mietpreis = db.Column(db.Numeric(10, 2), nullable=False)

class Mieter(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    wohnung_id = db.Column(db.Integer, db.ForeignKey('wohnung.id'), nullable=True)

# Endpunkte
@app.route('/wohnungen', methods=['GET', 'POST'])
def wohnungen():
    if request.method == 'POST':
        data = request.json
        neue_wohnung = Wohnung(adresse=data['adresse'], groesse=data['groesse'], mietpreis=data['mietpreis'])
        db.session.add(neue_wohnung)
        db.session.commit()
        return jsonify({'message': 'Wohnung hinzugefügt'}), 201

    wohnungen = Wohnung.query.all()
    return jsonify([{
        'id': w.id,
        'adresse': w.adresse,
        'groesse': w.groesse,
        'mietpreis': float(w.mietpreis)
    } for w in wohnungen])

@app.route('/mieter', methods=['GET', 'POST'])
def mieter():
    if request.method == 'POST':
        data = request.json
        neuer_mieter = Mieter(name=data['name'], email=data['email'], wohnung_id=data.get('wohnung_id'))
        db.session.add(neuer_mieter)
        db.session.commit()
        return jsonify({'message': 'Mieter hinzugefügt'}), 201

    mieter = Mieter.query.all()
    return jsonify([{
        'id': m.id,
        'name': m.name,
        'email': m.email,
        'wohnung_id': m.wohnung_id
    } for m in mieter])

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
