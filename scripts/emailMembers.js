const request = require('superagent')
const config = require('../configuration')
const sg = require('sendgrid')(config.sendgrid.token)
const helper = require('sendgrid').mail
const fs = require('fs')
const path = require('path')
const addresses = require('./addresses')

var templateReader = function(templatePath) {
  var filePath = path.join(__dirname, templatePath);
  console.log({filePath})
  return fs.readFileSync(filePath, {encoding: 'utf-8'})
};

let emailBody = templateReader('template.html')

request
    .get('http://192.168.0.110:8003/state')
    .end((err, res) => {
        res.body.members.forEach( member => {
            request
                .post('http://192.168.0.110:8003/events')
                .send({
                    type: 'member-address-updated',
                    memberId: member.memberId,
                    address: addresses.pop()
                })
                .end((err, res)=> {
                    console.log({err,res})
                })
        })
    })

function remind(member){
    let mail = new helper.Mail()
    let from_email = new helper.Email(config.sendgrid.from)
    let personalization = new helper.Personalization()
    let to_email = new helper.Email(member.email)

    mail.setFrom(from_email)
    mail.setSubject(config.sendgrid.subject)
    personalization.addTo(to_email)

    substitution = new helper.Substitution("%address%", member.address)
    personalization.addSubstitution(substitution)

    substitution = new helper.Substitution("%name%", member.name)
    personalization.addSubstitution(substitution)

    substitution = new helper.Substitution("%amount%", '75')
    personalization.addSubstitution(substitution)

    mail.addPersonalization(personalization)

    content = new helper.Content('text/html', emailBody)
    mail.addContent(content)

    request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON()
    })

    sg.API(request, function(error, response) {
        console.log(response.statusCode);
        console.log(response.body);
        console.log(response.headers);
    })
}