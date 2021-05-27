require('dotenv').config();

var jwt = require('jsonwebtoken');

const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')



var mysql = require('mysql')
var pool  = mysql.createPool({
    connectionLimit : 10, // default = 10
    host: 'localhost',
    user: 'root',
    password: '123qwe',
    database: 'schedule'
})



const IN_PROD = process.env.NODE_ENV === 'production'

const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: { secure: true, httpOnly: false }
}))


function verifyJWT(req, res, next){
    var token = req.headers['authorization'].split(' ')[1];

    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
      req.userId = decoded.name;
      req.token = decoded.headerCookie;

      next();
    });
}



// USUARIOS LOGIN
app.post('/login', async (req, res) => {
    const { username, password } = req.body
    
    if (username && password) {
        pool.getConnection(function (err, connection) {
            let query = "SELECT * FROM usuario LEFT OUTER JOIN pessoa ON pessoa.IdPessoa = usuario.IdPessoa WHERE Usuario = '" + username + "' AND Senha = '" + password + "'";
            
            connection.query(query, function (err, rows) {
                connection.release();
                
                if (err) return res.status(500).send({ error: 'Something failed!' });

                res.send(JSON.stringify(rows));
            })
        });
    }
})

// USUARIOS REGISTRO
app.post('/register', async (req, res) => {
    const { username, password } = req.body
    
    if (username && password) {
        pool.getConnection(function (err, connection) {
            let query = "INSERT INTO users (username, password) SET username = '" + username + "', password = '" + password + "'";

            connection.query(query, function (err, rows) {
                connection.release();
                
                if (err) return res.status(500).send({ error: 'Something failed!' });

                res.send(JSON.stringify(rows));
            })
        });
    }
})

// USUARIO SAIR
app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/home')
        }

        res.clearCookie(process.env.SESS_NAME)
        return res.redirect('/login')
    })
})



// CADASTRO DE CONVENIO
app.post('/agreement', async (req, res) => {
    const { name, description } = req.body
    
    if (description) {
        pool.getConnection(function (err, connection) {
            let query = "INSERT INTO convenio (NomeConvenio, DescricaoConvenio) VALUES ('" + name + "', '" + description + "')";
            
            connection.query(query, function (err, rows) {
                connection.release();
                
                if (err) return res.status(500).send({ error: 'Something failed!' });

                res.send(JSON.stringify(rows));
            })
        });
    }
})

// DELETE CONVENIO
app.post('/agreement/delete', async (req, res) => {
    const { id } = req.body
    
    pool.getConnection(function (err, connection) {
        let query = "DELETE FROM convenio WHERE IdConvenio = " + id

        connection.query(query, function (err, rows) {
            connection.release();
            
            if (err) return res.status(500).send({ error: 'Something failed!' });

            res.send(JSON.stringify('ok'));
        })
    });
})

// LISTAR CONVENIO
app.get('/agreements', async (req, res) => {
    pool.getConnection(function (err, connection) {
        let query = "SELECT * FROM Convenio ORDER BY IdConvenio DESC";

        connection.query(query, function (err, rows) {
            connection.release();
            
            if (err) return res.status(500).send({ error: 'Something failed!' });

            res.send(JSON.stringify(rows));
        })
    });
})



// CADASTRO DE PESSOAS
app.post('/person', async (req, res) => {
    const { name, username, birthdate, document, gender, cpf, naturalness, civil_status, nationality, schooling,
            previous_profession, current_profession, emergency_contact, degree_of_kinship, type } = req.body

    pool.getConnection(function (err, connection) {
        let query = "INSERT INTO Pessoa (Nome, DataNascimento, RG, Sexo, CPF, Naturalidade, ProfissaoAtual, ProfissaoAnterior, EstadoCivil, \
            Escolaridade, ContatoEmergencial, GrauParentesco, Nacionalidade, TipoPessoa) values ( \
           '"+name+"', '"+birthdate+"', '"+document+"', '"+gender+"', '"+cpf+"', '"+naturalness+"', '"+current_profession+"', \
           '"+previous_profession+"', '"+civil_status+"', '"+schooling+"', '"+emergency_contact+"', '"+degree_of_kinship+"', '"+nationality+"', '"+type+"')"
        
        connection.query(query, function(err, result, fields) {
            if (err) throw err;

            query = "INSERT INTO usuario (Usuario, Senha, IdPessoa) VALUES ('" + username + "', '123qwe', "+ result.insertId +")"

            connection.query(query, function (err, rows) {
                connection.release();

                if (err) return res.status(500).send({ error: 'Something failed!' });

                res.send(JSON.stringify('ok'));
            })
        })
    });
})

// PERSON
app.post('/person-edit', async (req, res) => {
    const { id, name, birthdate, document, gender, cpf, naturalness, civil_status, nationality, schooling,
            previous_profession, current_profession, emergency_contact, degree_of_kinship, type, username } = req.body

    pool.getConnection(function (err, connection) {
        let query = "UPDATE Pessoa SET Nome = '" + name + "', DataNascimento = '" + birthdate + "', RG = '" + document + "', Sexo = '" + gender + "', CPF = '" + cpf + "', \
            Naturalidade = '" + naturalness + "', ProfissaoAtual = '" + current_profession + "', ProfissaoAnterior = '" + previous_profession + "', EstadoCivil = '" + civil_status + "', \
            Escolaridade = '" + schooling + "', ContatoEmergencial = '" + emergency_contact + "', GrauParentesco = '" + degree_of_kinship + "', Nacionalidade = '" + nationality + "', \
            TipoPessoa = '" + type + "' WHERE IdPessoa = " + id
        
        connection.query(query, function(err, result, fields) {
            if (err) throw err;

            query = "UPDATE usuario SET Senha = '" + cpf + "' WHERE IdPessoa = " + id

            connection.query(query, function (err, rows) {
                connection.release();

                if (err) return res.status(500).send({ error: 'Something failed!' });

                res.send(JSON.stringify('ok'));
            })
        })
    });
})


// PERSON DELETE
app.post('/person/delete', async (req, res) => {
    const { id } = req.body
    
    pool.getConnection(function (err, connection) {
        let query = "DELETE FROM usuario WHERE IdPessoa = " + id

        connection.query(query, function (err, rows) {
            let query = "DELETE FROM pessoa WHERE IdPessoa = " + id

            connection.query(query, function (err, rows) {
                connection.release();

                if (err) return res.status(500).send({ error: 'Something failed!' });

                res.send(JSON.stringify('ok'));
            })                
        })
    });
})

// GET PERSON
app.get('/people', async (req, res) => {
    pool.getConnection(function (err, connection) {
        let query = "SELECT * FROM Pessoa ORDER BY IdPessoa DESC";

        connection.query(query, function (err, rows) {
            connection.release();
            
            if (err) return res.status(500).send({ error: 'Something failed!' });

            res.send(JSON.stringify(rows));
        })
    });
})

// GET PATIENT
app.get('/patients', async (req, res) => {
    pool.getConnection(function (err, connection) {
        let query = "SELECT * FROM Pessoa WHERE TipoPessoa = 'Paciente' ORDER BY IdPessoa DESC";

        connection.query(query, function (err, rows) {
            connection.release();
            
            if (err) return res.status(500).send({ error: 'Something failed!' });

            res.send(JSON.stringify(rows));
        })
    });
})




// POST SCHEDULE
app.post('/schedule', async (req, res) => {
    const { date, time, specialist, agreement, patient } = req.body
    
    pool.getConnection(function (err, connection) {
        let query = "INSERT INTO agendamento (DataAgendamento, HoraAgendamento, IdConvenio, \
                                                IdPessoa, IdEspecialista) values ( \
           '" + date + "', '" + time + "', " + agreement + ", " + patient + ", " + specialist + ")"

        connection.query(query, function (err, rows) {
            connection.release();
            
            if (err) return res.status(500).send({ error: 'Something failed!' });

            res.send(JSON.stringify('ok'));
        })
    });
})

// POST SCHEDULE
app.post('/schedule-edit', async (req, res) => {
    const { id, date, time, specialist, agreement, patient } = req.body
    
    pool.getConnection(function (err, connection) {
        let query = "UPDATE agendamento SET DataAgendamento = '" + date + "', HoraAgendamento = '" + time + "', IdConvenio = " + agreement + ", \
                                            IdPessoa = " + patient + ", IdEspecialista = " + specialist + " WHERE IdAgendamento = " + id

        connection.query(query, function (err, rows) {
            connection.release();
            
            if (err) return res.status(500).send({ error: 'Something failed!' });

            res.send(JSON.stringify('ok'));
        })
    });
})

// GET SCHEDULES
app.get('/schedules', async (req, res) => {
    var url = require('url');
    var url_parts = url.parse(req.url, true);
    var q = url_parts.query;

    pool.getConnection(function (err, connection) {
        let query = "SELECT agendamento.*, TIME_FORMAT(agendamento.HoraAgendamento, '%H:%i') as HoraFormatada, convenio.NomeConvenio as convenio, \
                    pessoa.Nome as paciente, espc.Nome as especialista \
                    FROM agendamento \
                    INNER JOIN convenio ON convenio.IdConvenio = agendamento.IdConvenio \
                    INNER JOIN pessoa ON pessoa.IdPessoa = agendamento.IdPessoa \
                    INNER JOIN especialista ON especialista.IdEspecialista = agendamento.IdEspecialista \
                    INNER JOIN pessoa as espc ON espc.IdPessoa = especialista.IdPessoa" + q.query + " ORDER BY IdAgendamento DESC";

        connection.query(query, function (err, rows) {
            connection.release();
            
            if (err) return res.status(500).send({ error: 'Something failed!' });

            res.send(JSON.stringify(rows));
        })
    });
})

// GET SCHEDULES
app.get('/schedules-pending', async (req, res) => {
    var url = require('url');
    var url_parts = url.parse(req.url, true);
    var q = url_parts.query;

    pool.getConnection(function (err, connection) {
        let query = "SELECT agendamento.*, TIME_FORMAT(agendamento.HoraAgendamento, '%H:%i') as HoraFormatada, convenio.NomeConvenio as convenio, \
                    pessoa.Nome as paciente, espc.Nome as especialista \
                    FROM agendamento \
                    INNER JOIN convenio ON convenio.IdConvenio = agendamento.IdConvenio \
                    INNER JOIN pessoa ON pessoa.IdPessoa = agendamento.IdPessoa \
                    INNER JOIN especialista ON especialista.IdEspecialista = agendamento.IdEspecialista \
                    INNER JOIN pessoa as espc ON espc.IdPessoa = especialista.IdPessoa" + q.query;

        connection.query(query, function (err, rows) {
            connection.release();
            
            if (err) return res.status(500).send({ error: 'Something failed!' });

            res.send(JSON.stringify(rows));
        })
    });
})



// POST RESET PWD
app.post('/reset-password', async (req, res) => {
    const { cpf, contact, password } = req.body
    
    pool.getConnection(function (err, connection) {
        let query = "select * from pessoa where cpf = '" + cpf + "' and ContatoEmergencial = '" + contact + "' limit 1"
        
        connection.query(query, function (err, rows) {
            if (rows.length === 0) {
                return res.status(500).send({ error: 'Something failed!' });
            }
            
            query = "UPDATE usuario SET Senha = '" + password + "' WHERE IdPessoa = " + rows[0].IdPessoa
            
            connection.query(query, function (err, rows) {
                connection.release();
            
                if (err) return res.status(500).send({ error: 'Something failed!' });

                res.send(JSON.stringify('ok'));
            })
        })
    });
})


// POST APPOINTMENT
app.post('/appointment', async (req, res) => {
    const { weight, height, imc, diagnosis, patient, specialist, schedule } = req.body
    
    pool.getConnection(function (err, connection) {
        let query = "INSERT INTO consulta (DataConsulta, HoraConsulta, Peso, Altura, IMC, \
                                            DiagnosticoClinico, IdPessoa, IdAgendamento, IdEspecialista) values ( \
                                            NOW(), CURRENT_TIMESTAMP(), '" + weight + "', '" + height + "', '" + imc + "', '" + diagnosis + "', " + patient + ", " + schedule + ", " + specialist + ")"
        
        connection.query(query, function (err, rows) {
            query = "UPDATE agendamento SET Status = 1 WHERE IdAgendamento = " + schedule
            
            connection.query(query, function (err, rows) {
                connection.release();
            
                if (err) return res.status(500).send({ error: 'Something failed!' });

                res.send(JSON.stringify('ok'));
            })
        })
    });
})

// POST APPOINTMENT
app.post('/appointment-edit', async (req, res) => {
    const { id, weight, height, imc, diagnosis } = req.body
    
    pool.getConnection(function (err, connection) {
        let query = "UPDATE consulta SET DiagnosticoClinico  = '" + diagnosis + "', Peso  = '" + weight + "', Altura  = '" + height + "', IMC  = '" + imc + "' WHERE IdConsulta = " + id
        
        connection.query(query, function (err, rows) {
            connection.release();
        
            if (err) return res.status(500).send({ error: 'Something failed!' });

            res.send(JSON.stringify('ok'));
        })
    });
})

// GET APPOINTMENT
app.get('/appointments', async (req, res) => {
    var url = require('url');
    var url_parts = url.parse(req.url, true);
    var q = url_parts.query;
    
    pool.getConnection(function (err, connection) {
        let query = "SELECT DataConsulta, HoraConsulta, TIME_FORMAT(consulta.HoraConsulta, '%H:%i') as HoraFormatada, \
                            spec.Nome AS especialista, pessoa.Nome AS paciente, DiagnosticoClinico, peso, altura, imc \
                    FROM consulta \
                    INNER JOIN pessoa ON pessoa.IdPessoa = consulta.IdPessoa \
                    INNER JOIN especialista ON consulta.IdEspecialista = especialista.IdEspecialista \
                    INNER JOIN pessoa AS spec ON spec.IdPessoa = especialista.IdPessoa " + q.query + " ORDER BY IdConsulta DESC"

        connection.query(query, function (err, rows) {
            connection.release();
            
            if (err) return res.status(500).send({ error: 'Something failed!' });

            res.send(JSON.stringify(rows));
        })
    });
})



// PROCEDURES
app.post('/procedure', async (req, res) => {
    const { date, time, specialist, agreement, procedure_type, patient } = req.body
    
    pool.getConnection(function (err, connection) {
        let query = "INSERT INTO procedimento (DataProcedimento, HoraProcedimento, IdConvenio, \
                                                IdTipoProcedimento, IdEspecialista, IdPessoa) values ( \
           '" + date + "', '" + time + "', " + agreement + ", " + procedure_type + ", " + specialist + ", " + patient + ")"

        connection.query(query, function (err, rows) {
            connection.release();
            
            if (err) return res.status(500).send({ error: 'Something failed!' });

            res.send(JSON.stringify('ok'));
        })
    });
})

// PROCEDURE DELETE
app.post('/procedure/delete', async (req, res) => {
    const { id } = req.body
    
    pool.getConnection(function (err, connection) {
        let query = "DELETE FROM procedimento WHERE IdProcedimento = " + id

        connection.query(query, function (err, rows) {
            connection.release();
            
            if (err) return res.status(500).send({ error: 'Something failed!' });

            res.send(JSON.stringify('ok'));
        })
    });
})

// GET PROCEDURES
app.get('/procedures', async (req, res) => {
    pool.getConnection(function (err, connection) {
        let query = `SELECT
                        p.*,
                        convenio.NomeConvenio as convenio,
                        tipoprocedimento.DescricaoTipoProcedimento as tipoprocedimento,
                        especialista.Especialidade as especialidade, 
                        pessoa.Nome as pessoa,
                        paciente.Nome as paciente
                    FROM procedimento p 
                    INNER JOIN convenio
                        ON convenio.IdConvenio = p.IdConvenio 
                    INNER JOIN tipoprocedimento 
                        ON tipoprocedimento.IdTipoProcedimento = p.IdTipoProcedimento 
                    INNER JOIN especialista 
                        ON especialista.IdEspecialista = p.IdEspecialista 
                    INNER JOIN pessoa 
                        ON especialista.IdPessoa = pessoa.IdPessoa
                    LEFT OUTER JOIN pessoa AS paciente
                        ON p.IdPessoa = paciente.IdPessoa
                    ORDER BY IdProcedimento DESC`;

        connection.query(query, function (err, rows) {
            connection.release();
            
            if (err) return res.status(500).send({ error: 'Something failed!' });

            res.send(JSON.stringify(rows));
        })
    });
})



// PROCEDURE TYPES
app.post('/procedure-type', async (req, res) => {
    const { description } = req.body
    
    pool.getConnection(function (err, connection) {
        let query = "INSERT INTO tipoprocedimento (DescricaoTipoProcedimento) VALUES ('" + description + "')";
        
        connection.query(query, function (err, rows) {
            connection.release();
            
            if (err) return res.status(500).send({ error: 'Something failed!' });

            res.send(JSON.stringify('ok'));
        })
    });
})

// DELETE PROCEDURE TYPES
app.post('/procedure-type/delete', async (req, res) => {
    const { id } = req.body
    
    pool.getConnection(function (err, connection) {
        let query = "DELETE FROM tipoprocedimento WHERE IdTipoProcedimento = " + id

        connection.query(query, function (err, rows) {
            connection.release();
            
            if (err) return res.status(500).send({ error: 'Something failed!' });

            res.send(JSON.stringify('ok'));
        })
    });
})

// GET PROCEDURE TYPES
app.get('/procedure-types', async (req, res) => {
    pool.getConnection(function (err, connection) {
        let query = "SELECT * FROM TipoProcedimento ORDER BY IdTipoProcedimento DESC";

        connection.query(query, function (err, rows) {
            connection.release();
            
            if (err) return res.status(500).send({ error: 'Something failed!' });

            res.send(JSON.stringify(rows));
        })
    });
})



// SPECIALIST
app.post('/specialist', async (req, res) => {
    const { specialty, crm, person } = req.body
    
    pool.getConnection(function (err, connection) {
        let query = "INSERT INTO Especialista (Especialidade, CRMEspecialista, IdPessoa) VALUES ('" + specialty + "', '" + crm + "', " + person + ")";

        connection.query(query, function (err, rows) {
            connection.release();
            
            if (err) return res.status(500).send({ error: 'Something failed!' });

            res.send(JSON.stringify('ok'));
        })
    });
})

// DELETE SPECIALISTS
app.post('/specialist/delete', async (req, res) => {
    const { id } = req.body
    
    pool.getConnection(function (err, connection) {
        let query = "DELETE FROM especialista WHERE IdEspecialista = " + id

        connection.query(query, function (err, rows) {
            connection.release();
            
            if (err) return res.status(500).send({ error: 'Something failed!' });

            res.send(JSON.stringify('ok'));
        })
    });
})

// GET SPECIALISTS
app.get('/specialists', async (req, res) => {
    pool.getConnection(function (err, connection) {
        let query = "SELECT especialista.*, pessoa.Nome as Pessoa FROM especialista INNER JOIN pessoa ON pessoa.IdPessoa = especialista.IdPessoa ORDER BY IdEspecialista DESC";

        connection.query(query, function (err, rows) {
            connection.release();
            
            if (err) return res.status(500).send({ error: 'Something failed!' });

            res.send(JSON.stringify(rows));
        })
    });
})


// GET SPECIALISTS
app.get('/specialists-by-type', async (req, res) => {
    pool.getConnection(function (err, connection) {
        let query = "SELECT * FROM Pessoa WHERE TipoPessoa = 'Fisioterapeuta' ORDER BY IdPessoa DESC";

        connection.query(query, function (err, rows) {
            connection.release();
            
            if (err) return res.status(500).send({ error: 'Something failed!' });

            res.send(JSON.stringify(rows));
        })
    });
})


app.listen(process.env.PORT, () => console.log(
    `http://localhost:${process.env.PORT}`
))