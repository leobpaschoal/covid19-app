import React, { Component } from 'react';
import { monitor } from '../../client';
import moment from 'moment';
import { replaceStringToNumber } from '../Utils/Numbers';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class Graphic extends Component {
  state = {
    casesByParticularCountry: [],
    loadingCasesByParticularCountry: true,
  };

  getCasesByParticularCountry = async (country) => {
    await monitor()
      .get('/cases_by_particular_country.php', { params: { country: country } })
      .then((response) => {
        if (response.statusText === 'OK') {
          const stats = response.data.stat_by_country;
          const filteredStats = stats.filter((stat) => moment(stat.record_date).format('HH:mm') === '23:50');
          filteredStats.push(stats.pop());
          console.log(filteredStats);
          const dataChart = filteredStats.map((fs) => ({
            name: moment(fs.record_date).format('YYYY-MM-DD'),
            confirmed: replaceStringToNumber(fs.total_cases),
            deaths: replaceStringToNumber(fs.total_deaths),
            recovered: replaceStringToNumber(fs.total_recovered),
            infected: replaceStringToNumber(fs.active_cases),
          }));
          // id: "3149"
          // country_name: "USA"
          // total_cases: "6,439"
          // new_cases: "1,776"
          // active_cases: "6,224"
          // total_deaths: "109"
          // new_deaths: "23"
          // total_recovered: "106"
          // serious_critical: "12"
          // region: null
          // total_cases_per1m: "19.5"
          // record_date: "2020-03-17 23:50:02.071"
          console.log(dataChart);
          this.setState({ casesByParticularCountry: dataChart });
        } else {
          console.log('error cases_by_particular_country');
        }
      })
      .catch((e) => {
        console.log(e + ' catch!');
      });
  };

  render() {
    const { casesByParticularCountry } = this.state;
    return (
      <div>
        <label>Country</label>
        <select name='addressCountry' onChange={(e) => this.getCasesByParticularCountry(e.target.value)}>
          <option></option>
          <optgroup label='North America'>
            <option value='United States'>United States</option>
            <option value='United States Minor Outlying Islands'>United States Minor Outlying Islands</option>
            <option value='Canada'>Canada</option>
            <option value='Mexico'>Mexico</option>
            <option value='Anguilla'>Anguilla</option>
            <option value='Antigua and Barbuda'>Antigua and Barbuda</option>
            <option value='Aruba'>Aruba</option>
            <option value='Bahamas'>Bahamas</option>
            <option value='Barbados'>Barbados</option>
            <option value='Belize'>Belize</option>
            <option value='Bermuda'>Bermuda</option>
            <option value='British Virgin Islands'>British Virgin Islands</option>
            <option value='Cayman Islands'>Cayman Islands</option>
            <option value='Costa Rica'>Costa Rica</option>
            <option value='Cuba'>Cuba</option>
            <option value='Dominica'>Dominica</option>
            <option value='Dominican Republic'>Dominican Republic</option>
            <option value='El Salvador'>El Salvador</option>
            <option value='Grenada'>Grenada</option>
            <option value='Guadeloupe'>Guadeloupe</option>
            <option value='Guatemala'>Guatemala</option>
            <option value='Haiti'>Haiti</option>
            <option value='Honduras'>Honduras</option>
            <option value='Jamaica'>Jamaica</option>
            <option value='Martinique'>Martinique</option>
            <option value='Montserrat'>Montserrat</option>
            <option value='Netherlands Antilles'>Netherlands Antilles</option>
            <option value='Nicaragua'>Nicaragua</option>
            <option value='Panama'>Panama</option>
            <option value='Puerto Rico'>Puerto Rico</option>
            <option value='Saint Kitts and Nevis'>Saint Kitts and Nevis</option>
            <option value='Saint Lucia'>Saint Lucia</option>
            <option value='Saint Vincent and the Grenadines'>Saint Vincent and the Grenadines</option>
            <option value='Trinidad and Tobago'>Trinidad and Tobago</option>
            <option value='Turks and Caicos Islands'>Turks and Caicos Islands</option>
            <option value='US Virgin Islands'>US Virgin Islands</option>
          </optgroup>
          <optgroup label='South America'>
            <option value='Argentina'>Argentina</option>
            <option value='Bolivia'>Bolivia</option>
            <option value='Brazil'>Brazil</option>
            <option value='Chile'>Chile</option>
            <option value='Colombia'>Colombia</option>
            <option value='Ecuador'>Ecuador</option>
            <option value='Falkland Islands (Malvinas'>Falkland Islands (Malvinas)</option>
            <option value='French Guiana'>French Guiana</option>
            <option value='Guyana'>Guyana</option>
            <option value='Paraguay'>Paraguay</option>
            <option value='Peru'>Peru</option>
            <option value='Suriname'>Suriname</option>
            <option value='Uruguay'>Uruguay</option>
            <option value='Venezuela'>Venezuela</option>
          </optgroup>
          <optgroup label='Europe'>
            <option value='United Kingdom'>United Kingdom</option>
            <option value='Albania'>Albania</option>
            <option value='Andorra'>Andorra</option>
            <option value='Austria'>Austria</option>
            <option value='Belarus'>Belarus</option>
            <option value='Belgium'>Belgium</option>
            <option value='Bosnia and Herzegovina'>Bosnia and Herzegovina</option>
            <option value='Bulgaria'>Bulgaria</option>
            <option value='Croatia (Hrvatska'>Croatia (Hrvatska)</option>
            <option value='Cyprus'>Cyprus</option>
            <option value='Czech Republic'>Czech Republic</option>
            <option value='France'>France</option>
            <option value='Gibraltar'>Gibraltar</option>
            <option value='Germany'>Germany</option>
            <option value='Greece'>Greece</option>
            <option value='Holy See (Vatican City State'>Holy See (Vatican City State)</option>
            <option value='Hungary'>Hungary</option>
            <option value='Italy'>Italy</option>
            <option value='Liechtenstein'>Liechtenstein</option>
            <option value='Luxembourg'>Luxembourg</option>
            <option value='Macedonia'>Macedonia</option>
            <option value='Malta'>Malta</option>
            <option value='Moldova'>Moldova</option>
            <option value='Monaco'>Monaco</option>
            <option value='Montenegro'>Montenegro</option>
            <option value='Netherlands'>Netherlands</option>
            <option value='Poland'>Poland</option>
            <option value='Portugal'>Portugal</option>
            <option value='Romania'>Romania</option>
            <option value='San Marino'>San Marino</option>
            <option value='Serbia'>Serbia</option>
            <option value='Slovakia'>Slovakia</option>
            <option value='Slovenia'>Slovenia</option>
            <option value='Spain'>Spain</option>
            <option value='Ukraine'>Ukraine</option>
            <option value='Denmark'>Denmark</option>
            <option value='Estonia'>Estonia</option>
            <option value='Faroe Islands'>Faroe Islands</option>
            <option value='Finland'>Finland</option>
            <option value='Greenland'>Greenland</option>
            <option value='Iceland'>Iceland</option>
            <option value='Ireland'>Ireland</option>
            <option value='Latvia'>Latvia</option>
            <option value='Lithuania'>Lithuania</option>
            <option value='Norway'>Norway</option>
            <option value='Svalbard and Jan Mayen Islands'>Svalbard and Jan Mayen Islands</option>
            <option value='Sweden'>Sweden</option>
            <option value='Switzerland'>Switzerland</option>
            <option value='Turkey'>Turkey</option>
          </optgroup>
          <optgroup label='Asia'>
            <option value='Afghanistan'>Afghanistan</option>
            <option value='Armenia'>Armenia</option>
            <option value='Azerbaijan'>Azerbaijan</option>
            <option value='Bahrain'>Bahrain</option>
            <option value='Bangladesh'>Bangladesh</option>
            <option value='Bhutan'>Bhutan</option>
            <option value='British Indian Ocean Territory'>British Indian Ocean Territory</option>
            <option value='Brunei Darussalam'>Brunei Darussalam</option>
            <option value='Cambodia'>Cambodia</option>
            <option value='China'>China</option>
            <option value='Christmas Island'>Christmas Island</option>
            <option value='Cocos (Keeling) Islands'>Cocos (Keeling) Islands</option>
            <option value='Georgia'>Georgia</option>
            <option value='Hong Kong'>Hong Kong</option>
            <option value='India'>India</option>
            <option value='Indonesia'>Indonesia</option>
            <option value='Iran'>Iran</option>
            <option value='Iraq'>Iraq</option>
            <option value='Israel'>Israel</option>
            <option value='Japan'>Japan</option>
            <option value='Jordan'>Jordan</option>
            <option value='Kazakhstan'>Kazakhstan</option>
            <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
            <option value='Korea, Republic of'>Korea, Republic of</option>
            <option value='Kuwait'>Kuwait</option>
            <option value='Kyrgyzstan'>Kyrgyzstan</option>
            <option value='Lao'>Lao</option>
            <option value='Lebanon'>Lebanon</option>
            <option value='Malaysia'>Malaysia</option>
            <option value='Maldives'>Maldives</option>
            <option value='Mongolia'>Mongolia</option>
            <option value='Myanmar (Burma'>Myanmar (Burma)</option>
            <option value='Nepal'>Nepal</option>
            <option value='Oman'>Oman</option>
            <option value='Pakistan'>Pakistan</option>
            <option value='Philippines'>Philippines</option>
            <option value='Qatar'>Qatar</option>
            <option value='Russian Federation'>Russian Federation</option>
            <option value='Saudi Arabia'>Saudi Arabia</option>
            <option value='Singapore'>Singapore</option>
            <option value='Sri Lanka'>Sri Lanka</option>
            <option value='Syria'>Syria</option>
            <option value='Taiwan'>Taiwan</option>
            <option value='Tajikistan'>Tajikistan</option>
            <option value='Thailand'>Thailand</option>
            <option value='East Timor'>East Timor</option>
            <option value='Turkmenistan'>Turkmenistan</option>
            <option value='United Arab Emirates'>United Arab Emirates</option>
            <option value='Uzbekistan'>Uzbekistan</option>
            <option value='Vietnam'>Vietnam</option>
            <option value='Yemen'>Yemen</option>
          </optgroup>
          <optgroup label='Australia / Oceania'>
            <option value='American Samoa'>American Samoa</option>
            <option value='Australia'>Australia</option>
            <option value='Cook Islands'>Cook Islands</option>
            <option value='Fiji'>Fiji</option>
            <option value='French Polynesia (Tahiti'>French Polynesia (Tahiti)</option>
            <option value='Guam'>Guam</option>
            <option value='Kiribati'>Kiribati</option>
            <option value='Marshall Islands'>Marshall Islands</option>
            <option value='Micronesia, Federated States of'>Micronesia, Federated States of</option>
            <option value='Nauru'>Nauru</option>
            <option value='New Caledonia'>New Caledonia</option>
            <option value='New Zealand'>New Zealand</option>
            <option value='Niue'>Niue</option>
            <option value='Northern Mariana Islands'>Northern Mariana Islands</option>
            <option value='Palau'>Palau</option>
            <option value='Papua New Guinea'>Papua New Guinea</option>
            <option value='Pitcairn'>Pitcairn</option>
            <option value='Samoa'>Samoa</option>
            <option value='Solomon Islands'>Solomon Islands</option>
            <option value='Tokelau'>Tokelau</option>
            <option value='Tonga'>Tonga</option>
            <option value='Tuvalu'>Tuvalu</option>
            <option value='Vanuatu'>Vanuatu</option>
            <option valud='WF'>Wallis and Futuna Islands</option>
          </optgroup>
          <optgroup label='Africa'>
            <option value='Algeria'>Algeria</option>
            <option value='Angola'>Angola</option>
            <option value='Benin'>Benin</option>
            <option value='Botswana'>Botswana</option>
            <option value='Burkina Faso'>Burkina Faso</option>
            <option value='Burundi'>Burundi</option>
            <option value='Cameroon'>Cameroon</option>
            <option value='Cape Verde'>Cape Verde</option>
            <option value='Central African Republic'>Central African Republic</option>
            <option value='Chad'>Chad</option>
            <option value='Comoros'>Comoros</option>
            <option value='Congo'>Congo</option>
            <option value='Congo, the Democratic Republic of the'>Congo, the Democratic Republic of the</option>
            <option value='Dijibouti'>Dijibouti</option>
            <option value='Egypt'>Egypt</option>
            <option value='Equatorial Guinea'>Equatorial Guinea</option>
            <option value='Eritrea'>Eritrea</option>
            <option value='Ethiopia'>Ethiopia</option>
            <option value='Gabon'>Gabon</option>
            <option value='Gambia'>Gambia</option>
            <option value='Ghana'>Ghana</option>
            <option value='Guinea'>Guinea</option>
            <option value='Guinea-Bissau'>Guinea-Bissau</option>
            <option value="Cote d'Ivoire (Ivory Coast">Cote d'Ivoire (Ivory Coast)</option>
            <option value='Kenya'>Kenya</option>
            <option value='Lesotho'>Lesotho</option>
            <option value='Liberia'>Liberia</option>
            <option value='Libya'>Libya</option>
            <option value='Madagascar'>Madagascar</option>
            <option value='Malawi'>Malawi</option>
            <option value='Mali'>Mali</option>
            <option value='Mauritania'>Mauritania</option>
            <option value='Mauritius'>Mauritius</option>
            <option value='Mayotte'>Mayotte</option>
            <option value='Morocco'>Morocco</option>
            <option value='Mozambique'>Mozambique</option>
            <option value='Namibia'>Namibia</option>
            <option value='Niger'>Niger</option>
            <option value='Nigeria'>Nigeria</option>
            <option value='Reunion'>Reunion</option>
            <option value='Rwanda'>Rwanda</option>
            <option value='Sao Tome and Principe'>Sao Tome and Principe</option>
            <option value='Saint Helena'>Saint Helena</option>
            <option value='Senegal'>Senegal</option>
            <option value='Seychelles'>Seychelles</option>
            <option value='Sierra Leone'>Sierra Leone</option>
            <option value='Somalia'>Somalia</option>
            <option value='South Africa'>South Africa</option>
            <option value='South Sudan'>South Sudan</option>
            <option value='Sudan'>Sudan</option>
            <option value='Swaziland'>Swaziland</option>
            <option value='Tanzania'>Tanzania</option>
            <option value='Togo'>Togo</option>
            <option value='Tunisia'>Tunisia</option>
            <option value='Uganda'>Uganda</option>
            <option value='Western Sahara'>Western Sahara</option>
            <option value='Zambia'>Zambia</option>
            <option value='Zimbabwe'>Zimbabwe</option>
          </optgroup>
          <option value='Antarctica'>Antarctica</option>
        </select>
        <LineChart
          width={800}
          height={300}
          data={casesByParticularCountry}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type='monotone' dataKey='confirmed' stroke='#8884d8' activeDot={{ r: 8 }} />
          <Line type='monotone' dataKey='deaths' stroke='#82ca9d' />
          <Line type='monotone' dataKey='recovered' stroke='#9dff00' />
          <Line type='monotone' dataKey='infected' stroke='#CD5F9A' />
        </LineChart>
      </div>
    );
  }
}

export default Graphic;
