// NetScope India - Comprehensive Carrier Intelligence & Regional Benchmark Matrix (All 36 States & UTs)
(function() {
  const telecomData = {
    'Andhra Pradesh': {
      'Visakhapatnam': {
        'Jio': { dl: 242, ul: 60, ping: 14, cov5g: '96%', score: 92, bestArea: 'Rushikonda IT Park & Siripuram' },
        'Airtel': { dl: 235, ul: 58, ping: 15, cov5g: '95%', score: 91, bestArea: 'Gajuwaka Industrial & Beach Road' },
        'Vi': { dl: 98, ul: 30, ping: 28, cov5g: '64%', score: 75, bestArea: 'Dwaraka Nagar & Jagadamba' },
        'BSNL': { dl: 44, ul: 16, ping: 44, cov5g: '32%', score: 62, bestArea: 'MVP Colony & Waltair' }
      },
      'Vijayawada': {
        'Jio': { dl: 228, ul: 56, ping: 16, cov5g: '94%', score: 90, bestArea: 'Benz Circle & MG Road' },
        'Airtel': { dl: 230, ul: 58, ping: 15, cov5g: '95%', score: 91, bestArea: 'Autonagar & Governorpet' },
        'Vi': { dl: 92, ul: 28, ping: 30, cov5g: '62%', score: 73, bestArea: 'One Town Commercial' },
        'BSNL': { dl: 40, ul: 14, ping: 48, cov5g: '30%', score: 60, bestArea: 'Bhavanipuram' }
      },
      'Tirupati': {
        'Jio': { dl: 210, ul: 52, ping: 18, cov5g: '92%', score: 89, bestArea: 'Alipiri & Temple Corridor' },
        'Airtel': { dl: 205, ul: 50, ping: 19, cov5g: '91%', score: 88, bestArea: 'Renigunta & University Campus' },
        'Vi': { dl: 86, ul: 25, ping: 32, cov5g: '58%', score: 71, bestArea: 'Bhavani Nagar' },
        'BSNL': { dl: 38, ul: 12, ping: 50, cov5g: '28%', score: 58, bestArea: 'KT Road' }
      },
      'Guntur': {
        'Jio': { dl: 215, ul: 54, ping: 17, cov5g: '93%', score: 90, bestArea: 'Brodipet & Arundelpet' },
        'Airtel': { dl: 212, ul: 52, ping: 18, cov5g: '92%', score: 89, bestArea: 'Laxmipuram & Collectorate' },
        'Vi': { dl: 88, ul: 26, ping: 31, cov5g: '60%', score: 72, bestArea: 'Old Guntur Market' },
        'BSNL': { dl: 39, ul: 14, ping: 47, cov5g: '29%', score: 59, bestArea: 'Kothapet' }
      }
    },
    'Arunachal Pradesh': {
      'Itanagar': {
        'Jio': { dl: 185, ul: 44, ping: 22, cov5g: '88%', score: 86, bestArea: 'Ganga Market & Secretariat' },
        'Airtel': { dl: 190, ul: 46, ping: 20, cov5g: '90%', score: 88, bestArea: 'Naharlagun Hub & Vivek Vihar' },
        'Vi': { dl: 68, ul: 20, ping: 38, cov5g: '45%', score: 66, bestArea: 'E-Sector' },
        'BSNL': { dl: 48, ul: 18, ping: 40, cov5g: '38%', score: 64, bestArea: 'Raj Bhavan & BSNL Regional Office' }
      },
      'Tawang': {
        'Jio': { dl: 145, ul: 36, ping: 28, cov5g: '80%', score: 81, bestArea: 'Monastery Area & Main Bazaar' },
        'Airtel': { dl: 152, ul: 38, ping: 26, cov5g: '82%', score: 83, bestArea: 'Helipad & Military Area' },
        'Vi': { dl: 52, ul: 16, ping: 44, cov5g: '35%', score: 61, bestArea: 'Old Market' },
        'BSNL': { dl: 42, ul: 15, ping: 45, cov5g: '35%', score: 62, bestArea: 'District HQ' }
      },
      'Pasighat': {
        'Jio': { dl: 168, ul: 40, ping: 24, cov5g: '84%', score: 84, bestArea: 'Market Complex & College Area' },
        'Airtel': { dl: 172, ul: 42, ping: 23, cov5g: '86%', score: 85, bestArea: 'Siang River Corridor' },
        'Vi': { dl: 58, ul: 18, ping: 40, cov5g: '40%', score: 63, bestArea: 'Main Gate' },
        'BSNL': { dl: 44, ul: 16, ping: 42, cov5g: '36%', score: 63, bestArea: 'Gumin Nagar' }
      }
    },
    'Assam': {
      'Guwahati': {
        'Jio': { dl: 240, ul: 60, ping: 14, cov5g: '96%', score: 92, bestArea: 'GS Road & Paltan Bazaar' },
        'Airtel': { dl: 245, ul: 62, ping: 13, cov5g: '97%', score: 93, bestArea: 'Dispur Secretariat & Zoo Road' },
        'Vi': { dl: 95, ul: 30, ping: 29, cov5g: '62%', score: 74, bestArea: 'Fancy Bazaar Commercial' },
        'BSNL': { dl: 46, ul: 18, ping: 42, cov5g: '34%', score: 63, bestArea: 'Pan Bazaar Optical Hub' }
      },
      'Dibrugarh': {
        'Jio': { dl: 205, ul: 50, ping: 19, cov5g: '91%', score: 88, bestArea: 'Medical College & HS Road' },
        'Airtel': { dl: 212, ul: 52, ping: 18, cov5g: '92%', score: 89, bestArea: 'New Market & Boiragimoth' },
        'Vi': { dl: 78, ul: 24, ping: 34, cov5g: '54%', score: 69, bestArea: 'Thana Chariali' },
        'BSNL': { dl: 42, ul: 15, ping: 46, cov5g: '32%', score: 61, bestArea: 'Chowkidinghee' }
      },
      'Silchar': {
        'Jio': { dl: 190, ul: 46, ping: 22, cov5g: '88%', score: 86, bestArea: 'Tarapur & Rangirkhari' },
        'Airtel': { dl: 196, ul: 48, ping: 20, cov5g: '90%', score: 88, bestArea: 'Club Road & Hospital Point' },
        'Vi': { dl: 72, ul: 22, ping: 36, cov5g: '50%', score: 67, bestArea: 'Central Road' },
        'BSNL': { dl: 40, ul: 14, ping: 48, cov5g: '30%', score: 60, bestArea: 'Circuit House' }
      },
      'Jorhat': {
        'Jio': { dl: 198, ul: 48, ping: 20, cov5g: '90%', score: 87, bestArea: 'Gar-Ali & KB Road' },
        'Airtel': { dl: 202, ul: 50, ping: 19, cov5g: '91%', score: 88, bestArea: 'AT Road & Engineering College' },
        'Vi': { dl: 76, ul: 24, ping: 35, cov5g: '52%', score: 68, bestArea: 'Barbheta' },
        'BSNL': { dl: 41, ul: 15, ping: 47, cov5g: '31%', score: 60, bestArea: 'Tarajan' }
      }
    },
    'Bihar': {
      'Patna': {
        'Jio': { dl: 235, ul: 58, ping: 15, cov5g: '95%', score: 91, bestArea: 'Boring Road & Bailey Road' },
        'Airtel': { dl: 240, ul: 60, ping: 14, cov5g: '96%', score: 92, bestArea: 'Kankarbagh & Dak Bungalow' },
        'Vi': { dl: 94, ul: 28, ping: 30, cov5g: '60%', score: 73, bestArea: 'Frazer Road & Gandhi Maidan' },
        'BSNL': { dl: 45, ul: 16, ping: 45, cov5g: '33%', score: 62, bestArea: 'Patna Junction & Secretariat' }
      },
      'Gaya': {
        'Jio': { dl: 195, ul: 48, ping: 20, cov5g: '90%', score: 87, bestArea: 'Bodh Gaya Corridor & GB Road' },
        'Airtel': { dl: 198, ul: 50, ping: 19, cov5g: '91%', score: 88, bestArea: 'Civil Lines & AP Colony' },
        'Vi': { dl: 74, ul: 22, ping: 36, cov5g: '50%', score: 67, bestArea: 'Station Road' },
        'BSNL': { dl: 38, ul: 14, ping: 50, cov5g: '28%', score: 58, bestArea: 'Rampur' }
      },
      'Muzaffarpur': {
        'Jio': { dl: 202, ul: 50, ping: 19, cov5g: '91%', score: 88, bestArea: 'Mithanpura & Club Road' },
        'Airtel': { dl: 206, ul: 52, ping: 18, cov5g: '92%', score: 89, bestArea: 'Juran Chapra & Motijheel' },
        'Vi': { dl: 78, ul: 24, ping: 34, cov5g: '52%', score: 68, bestArea: 'Saraiyaganj' },
        'BSNL': { dl: 40, ul: 15, ping: 48, cov5g: '30%', score: 60, bestArea: 'Brahmpura' }
      },
      'Bhagalpur': {
        'Jio': { dl: 192, ul: 46, ping: 21, cov5g: '89%', score: 86, bestArea: 'Tilka Manjhi & Zero Mile' },
        'Airtel': { dl: 195, ul: 48, ping: 20, cov5g: '90%', score: 87, bestArea: 'Adampur & Khanjarpur' },
        'Vi': { dl: 72, ul: 22, ping: 36, cov5g: '48%', score: 66, bestArea: 'Khalifabag Market' },
        'BSNL': { dl: 39, ul: 14, ping: 49, cov5g: '29%', score: 59, bestArea: 'Barari' }
      }
    },
    'Chhattisgarh': {
      'Raipur': {
        'Jio': { dl: 230, ul: 58, ping: 16, cov5g: '94%', score: 90, bestArea: 'Pandri Commercial & VIP Road' },
        'Airtel': { dl: 236, ul: 60, ping: 15, cov5g: '95%', score: 91, bestArea: 'Telibandha & Shankar Nagar' },
        'Vi': { dl: 90, ul: 28, ping: 31, cov5g: '58%', score: 72, bestArea: 'Jaistambh Chowk' },
        'BSNL': { dl: 44, ul: 16, ping: 46, cov5g: '31%', score: 61, bestArea: 'Civil Lines' }
      },
      'Bhilai / Durg': {
        'Jio': { dl: 218, ul: 54, ping: 17, cov5g: '93%', score: 89, bestArea: 'Sector 6 Market & Civic Centre' },
        'Airtel': { dl: 222, ul: 56, ping: 16, cov5g: '94%', score: 90, bestArea: 'Nehru Nagar & Supela' },
        'Vi': { dl: 84, ul: 26, ping: 33, cov5g: '55%', score: 70, bestArea: 'Power House' },
        'BSNL': { dl: 41, ul: 15, ping: 48, cov5g: '30%', score: 60, bestArea: 'Durg Railway Colony' }
      },
      'Bilaspur': {
        'Jio': { dl: 204, ul: 50, ping: 19, cov5g: '91%', score: 88, bestArea: 'Vyapar Vihar & Link Road' },
        'Airtel': { dl: 208, ul: 52, ping: 18, cov5g: '92%', score: 89, bestArea: 'Rama Magneto & Torwa' },
        'Vi': { dl: 76, ul: 24, ping: 35, cov5g: '52%', score: 68, bestArea: 'Old High Court Road' },
        'BSNL': { dl: 39, ul: 14, ping: 49, cov5g: '29%', score: 59, bestArea: 'Railway Zone HQ' }
      }
    },
    'Goa': {
      'Panaji': {
        'Jio': { dl: 240, ul: 62, ping: 13, cov5g: '96%', score: 92, bestArea: 'Miramar & Campal Waterfront' },
        'Airtel': { dl: 235, ul: 58, ping: 14, cov5g: '95%', score: 91, bestArea: 'Patto Plaza & Panjim Market' },
        'Vi': { dl: 105, ul: 34, ping: 27, cov5g: '68%', score: 76, bestArea: 'Fontainhas & 18th June Road' },
        'BSNL': { dl: 48, ul: 18, ping: 42, cov5g: '35%', score: 64, bestArea: 'Altinho State Secretariat' }
      },
      'Margao': {
        'Jio': { dl: 225, ul: 56, ping: 16, cov5g: '94%', score: 90, bestArea: 'Colva Corridor & Station Road' },
        'Airtel': { dl: 228, ul: 58, ping: 15, cov5g: '95%', score: 91, bestArea: 'Fatorda Stadium & Gogol' },
        'Vi': { dl: 96, ul: 30, ping: 29, cov5g: '64%', score: 74, bestArea: 'Aquem & Old Market' },
        'BSNL': { dl: 44, ul: 16, ping: 45, cov5g: '32%', score: 62, bestArea: 'Pajifond' }
      },
      'Vasco da Gama': {
        'Jio': { dl: 215, ul: 52, ping: 18, cov5g: '92%', score: 89, bestArea: 'Dabolim Airport Corridor' },
        'Airtel': { dl: 220, ul: 54, ping: 17, cov5g: '93%', score: 90, bestArea: 'Mormugao Port & Baina' },
        'Vi': { dl: 88, ul: 26, ping: 32, cov5g: '58%', score: 71, bestArea: 'Swatantra Path' },
        'BSNL': { dl: 42, ul: 15, ping: 47, cov5g: '30%', score: 60, bestArea: 'Chicalim' }
      }
    },
    'Gujarat': {
      'Ahmedabad': {
        'Jio': { dl: 265, ul: 68, ping: 11, cov5g: '98%', score: 94, bestArea: 'SG Highway & GIFT City Node' },
        'Airtel': { dl: 258, ul: 65, ping: 12, cov5g: '97%', score: 93, bestArea: 'Prahlad Nagar & Bodakdev' },
        'Vi': { dl: 128, ul: 42, ping: 22, cov5g: '78%', score: 81, bestArea: 'Navrangpura & Ashram Road' },
        'BSNL': { dl: 52, ul: 20, ping: 38, cov5g: '38%', score: 66, bestArea: 'C.G. Road & Shahibaug' }
      },
      'Surat': {
        'Jio': { dl: 252, ul: 64, ping: 12, cov5g: '97%', score: 93, bestArea: 'Diamond Bourse & Vesu Corridor' },
        'Airtel': { dl: 248, ul: 62, ping: 13, cov5g: '96%', score: 92, bestArea: 'Adajan & Piplod' },
        'Vi': { dl: 118, ul: 38, ping: 25, cov5g: '74%', score: 78, bestArea: 'Ring Road Textile Market' },
        'BSNL': { dl: 48, ul: 18, ping: 41, cov5g: '34%', score: 63, bestArea: 'Athwa Lines' }
      },
      'Vadodara': {
        'Jio': { dl: 242, ul: 60, ping: 14, cov5g: '96%', score: 92, bestArea: 'Alkapuri & Old Padra Road' },
        'Airtel': { dl: 238, ul: 58, ping: 15, cov5g: '95%', score: 91, bestArea: 'Gotri & Karelibaug' },
        'Vi': { dl: 110, ul: 34, ping: 27, cov5g: '70%', score: 76, bestArea: 'Sayajigunj' },
        'BSNL': { dl: 45, ul: 16, ping: 44, cov5g: '32%', score: 62, bestArea: 'Fatehgunj' }
      },
      'Rajkot': {
        'Jio': { dl: 232, ul: 58, ping: 15, cov5g: '94%', score: 91, bestArea: 'Yagnik Road & Kalawad Road' },
        'Airtel': { dl: 228, ul: 56, ping: 16, cov5g: '93%', score: 90, bestArea: '150ft Ring Road & University' },
        'Vi': { dl: 102, ul: 32, ping: 28, cov5g: '66%', score: 74, bestArea: 'Dhebar Road' },
        'BSNL': { dl: 42, ul: 15, ping: 46, cov5g: '30%', score: 60, bestArea: 'Jagnath Plot' }
      }
    },
    'Haryana': {
      'Gurugram': {
        'Jio': { dl: 278, ul: 72, ping: 10, cov5g: '99%', score: 96, bestArea: 'Cyber City & Golf Course Road' },
        'Airtel': { dl: 284, ul: 75, ping: 9, cov5g: '99%', score: 97, bestArea: 'Airtel HQ & Udyog Vihar' },
        'Vi': { dl: 126, ul: 40, ping: 22, cov5g: '76%', score: 80, bestArea: 'MG Road & Sector 29' },
        'BSNL': { dl: 54, ul: 22, ping: 36, cov5g: '38%', score: 67, bestArea: 'Old Delhi Road' }
      },
      'Faridabad': {
        'Jio': { dl: 238, ul: 60, ping: 14, cov5g: '95%', score: 91, bestArea: 'Sector 15 & Neelam Bata Road' },
        'Airtel': { dl: 242, ul: 62, ping: 13, cov5g: '96%', score: 92, bestArea: 'Sector 21 & Mathura Road' },
        'Vi': { dl: 102, ul: 32, ping: 28, cov5g: '66%', score: 75, bestArea: 'NIT Commercial' },
        'BSNL': { dl: 46, ul: 18, ping: 43, cov5g: '32%', score: 62, bestArea: 'Sector 12 Court Complex' }
      },
      'Panipat': {
        'Jio': { dl: 215, ul: 54, ping: 17, cov5g: '93%', score: 89, bestArea: 'Model Town & GT Road' },
        'Airtel': { dl: 218, ul: 56, ping: 16, cov5g: '94%', score: 90, bestArea: 'Sector 11-12 Commercial' },
        'Vi': { dl: 88, ul: 26, ping: 32, cov5g: '58%', score: 71, bestArea: 'Insar Bazaar' },
        'BSNL': { dl: 40, ul: 14, ping: 48, cov5g: '28%', score: 59, bestArea: 'Refinery Township' }
      },
      'Karnal': {
        'Jio': { dl: 210, ul: 52, ping: 18, cov5g: '92%', score: 88, bestArea: 'Sector 13 & Mall Road' },
        'Airtel': { dl: 214, ul: 54, ping: 17, cov5g: '93%', score: 89, bestArea: 'Model Town & Kunjpura Road' },
        'Vi': { dl: 84, ul: 25, ping: 34, cov5g: '55%', score: 70, bestArea: 'Old City Centre' },
        'BSNL': { dl: 39, ul: 14, ping: 49, cov5g: '28%', score: 58, bestArea: 'NDRI Campus' }
      }
    },
    'Himachal Pradesh': {
      'Shimla': {
        'Jio': { dl: 210, ul: 52, ping: 18, cov5g: '92%', score: 89, bestArea: 'Mall Road & Sanjauli' },
        'Airtel': { dl: 218, ul: 56, ping: 16, cov5g: '94%', score: 91, bestArea: 'The Ridge & Chotta Shimla' },
        'Vi': { dl: 78, ul: 24, ping: 36, cov5g: '52%', score: 68, bestArea: 'Lakkar Bazaar' },
        'BSNL': { dl: 48, ul: 18, ping: 42, cov5g: '36%', score: 64, bestArea: 'Secretariat & HP University' }
      },
      'Dharamshala': {
        'Jio': { dl: 198, ul: 48, ping: 20, cov5g: '90%', score: 87, bestArea: 'McLeod Ganj & Cricket Stadium' },
        'Airtel': { dl: 204, ul: 50, ping: 19, cov5g: '91%', score: 88, bestArea: 'Kotwali Bazaar & Bhagsu' },
        'Vi': { dl: 72, ul: 22, ping: 38, cov5g: '48%', score: 66, bestArea: 'Kachehri Adda' },
        'BSNL': { dl: 44, ul: 16, ping: 45, cov5g: '33%', score: 62, bestArea: 'Civil Lines' }
      },
      'Manali': {
        'Jio': { dl: 188, ul: 44, ping: 22, cov5g: '88%', score: 86, bestArea: 'Mall Road & Old Manali' },
        'Airtel': { dl: 194, ul: 46, ping: 20, cov5g: '89%', score: 87, bestArea: 'Solang Valley Road & Aleo' },
        'Vi': { dl: 68, ul: 20, ping: 40, cov5g: '42%', score: 64, bestArea: 'Model Town' },
        'BSNL': { dl: 42, ul: 15, ping: 47, cov5g: '32%', score: 61, bestArea: 'Circuit House' }
      }
    },
    'Jharkhand': {
      'Ranchi': {
        'Jio': { dl: 232, ul: 58, ping: 15, cov5g: '94%', score: 91, bestArea: 'Main Road & Morabadi' },
        'Airtel': { dl: 236, ul: 60, ping: 14, cov5g: '95%', score: 92, bestArea: 'Harmu Housing & Ashok Nagar' },
        'Vi': { dl: 90, ul: 28, ping: 31, cov5g: '58%', score: 72, bestArea: 'Ratu Road' },
        'BSNL': { dl: 44, ul: 16, ping: 46, cov5g: '32%', score: 62, bestArea: 'Doranda Telecom Colony' }
      },
      'Jamshedpur': {
        'Jio': { dl: 238, ul: 60, ping: 14, cov5g: '95%', score: 92, bestArea: 'Bistupur Commercial & Sakchi' },
        'Airtel': { dl: 242, ul: 62, ping: 13, cov5g: '96%', score: 93, bestArea: 'Kadma & Sonari Airport' },
        'Vi': { dl: 94, ul: 30, ping: 29, cov5g: '62%', score: 74, bestArea: 'Golmuri' },
        'BSNL': { dl: 46, ul: 18, ping: 44, cov5g: '34%', score: 63, bestArea: 'Telco Colony' }
      },
      'Dhanbad': {
        'Jio': { dl: 212, ul: 52, ping: 18, cov5g: '92%', score: 89, bestArea: 'Bank More & Saraidhela' },
        'Airtel': { dl: 216, ul: 54, ping: 17, cov5g: '93%', score: 90, bestArea: 'IIT ISM Campus & City Centre' },
        'Vi': { dl: 82, ul: 25, ping: 34, cov5g: '54%', score: 69, bestArea: 'Hirapur' },
        'BSNL': { dl: 41, ul: 15, ping: 48, cov5g: '30%', score: 60, bestArea: 'Karmik Nagar' }
      }
    },
    'Karnataka': {
      'Bengaluru': {
        'Jio': { dl: 275, ul: 72, ping: 11, cov5g: '98%', score: 95, bestArea: 'Electronic City & Outer Ring Road' },
        'Airtel': { dl: 268, ul: 70, ping: 12, cov5g: '97%', score: 94, bestArea: 'Whitefield & Koramangala' },
        'Vi': { dl: 124, ul: 40, ping: 22, cov5g: '74%', score: 79, bestArea: 'Indiranagar & MG Road' },
        'BSNL': { dl: 56, ul: 22, ping: 36, cov5g: '38%', score: 66, bestArea: 'Halasuru Peering & Malleswaram' }
      },
      'Mysuru': {
        'Jio': { dl: 228, ul: 56, ping: 16, cov5g: '94%', score: 90, bestArea: 'Gokulam & Vijayanagar' },
        'Airtel': { dl: 232, ul: 58, ping: 15, cov5g: '95%', score: 91, bestArea: 'Jayalakshmipuram & Infosys Campus' },
        'Vi': { dl: 92, ul: 28, ping: 30, cov5g: '60%', score: 73, bestArea: 'Devaraja Market' },
        'BSNL': { dl: 44, ul: 16, ping: 45, cov5g: '32%', score: 62, bestArea: 'Karasawadi' }
      },
      'Mangaluru': {
        'Jio': { dl: 235, ul: 58, ping: 15, cov5g: '95%', score: 91, bestArea: 'Hampankatta & Bejai' },
        'Airtel': { dl: 238, ul: 60, ping: 14, cov5g: '96%', score: 92, bestArea: 'Kadri & Ladyhill' },
        'Vi': { dl: 98, ul: 30, ping: 28, cov5g: '64%', score: 75, bestArea: 'Kankanady' },
        'BSNL': { dl: 48, ul: 18, ping: 42, cov5g: '35%', score: 64, bestArea: 'Subsea Terminal & Panambur' }
      },
      'Hubballi-Dharwad': {
        'Jio': { dl: 218, ul: 54, ping: 17, cov5g: '93%', score: 89, bestArea: 'Vidyanagar & Gokul Road' },
        'Airtel': { dl: 222, ul: 56, ping: 16, cov5g: '94%', score: 90, bestArea: 'Koppikar Road & IIT Dharwad' },
        'Vi': { dl: 86, ul: 26, ping: 32, cov5g: '56%', score: 71, bestArea: 'Durgadbail' },
        'BSNL': { dl: 41, ul: 15, ping: 47, cov5g: '30%', score: 60, bestArea: 'Station Road' }
      }
    },
    'Kerala': {
      'Kochi': {
        'Jio': { dl: 260, ul: 65, ping: 12, cov5g: '97%', score: 93, bestArea: 'Infopark Kakkanad & Marine Drive' },
        'Airtel': { dl: 254, ul: 62, ping: 13, cov5g: '96%', score: 92, bestArea: 'MG Road & Edappally Lulu' },
        'Vi': { dl: 114, ul: 36, ping: 25, cov5g: '72%', score: 77, bestArea: 'Fort Kochi & Panampilly Nagar' },
        'BSNL': { dl: 52, ul: 20, ping: 38, cov5g: '38%', score: 66, bestArea: 'Subsea Cable Terminal & Willingdon' }
      },
      'Thiruvananthapuram': {
        'Jio': { dl: 250, ul: 62, ping: 13, cov5g: '96%', score: 92, bestArea: 'Technopark Phase 1-3 & Kazhakkoottam' },
        'Airtel': { dl: 248, ul: 60, ping: 14, cov5g: '95%', score: 91, bestArea: 'Vellayambalam & Kowdiar' },
        'Vi': { dl: 108, ul: 34, ping: 26, cov5g: '68%', score: 76, bestArea: 'Statue & MG Road' },
        'BSNL': { dl: 50, ul: 19, ping: 39, cov5g: '36%', score: 65, bestArea: 'PMG Junction BSNL HQ' }
      },
      'Kozhikode': {
        'Jio': { dl: 232, ul: 58, ping: 15, cov5g: '94%', score: 91, bestArea: 'Mavoor Road & Cyberpark' },
        'Airtel': { dl: 236, ul: 60, ping: 14, cov5g: '95%', score: 92, bestArea: 'Focus Mall Area & Beach Road' },
        'Vi': { dl: 96, ul: 30, ping: 29, cov5g: '62%', score: 74, bestArea: 'SM Street' },
        'BSNL': { dl: 46, ul: 18, ping: 43, cov5g: '33%', score: 63, bestArea: 'Mananchira' }
      },
      'Thrissur': {
        'Jio': { dl: 224, ul: 56, ping: 16, cov5g: '93%', score: 90, bestArea: 'Swaraj Round & West Fort' },
        'Airtel': { dl: 228, ul: 58, ping: 15, cov5g: '94%', score: 91, bestArea: 'East Fort & Ayyanthole' },
        'Vi': { dl: 92, ul: 28, ping: 30, cov5g: '60%', score: 73, bestArea: 'Kuruppam Road' },
        'BSNL': { dl: 44, ul: 16, ping: 45, cov5g: '31%', score: 62, bestArea: 'Poothole' }
      }
    },
    'Madhya Pradesh': {
      'Indore': {
        'Jio': { dl: 255, ul: 64, ping: 12, cov5g: '97%', score: 93, bestArea: 'Vijay Nagar & Super Corridor' },
        'Airtel': { dl: 250, ul: 62, ping: 13, cov5g: '96%', score: 92, bestArea: 'Palasia & AB Road' },
        'Vi': { dl: 112, ul: 36, ping: 26, cov5g: '70%', score: 77, bestArea: 'Rajwada Commercial' },
        'BSNL': { dl: 48, ul: 18, ping: 41, cov5g: '34%', score: 64, bestArea: 'Chhotigwaltoli' }
      },
      'Bhopal': {
        'Jio': { dl: 242, ul: 60, ping: 14, cov5g: '96%', score: 92, bestArea: 'MP Nagar Zone 1-2 & Arera Colony' },
        'Airtel': { dl: 238, ul: 58, ping: 15, cov5g: '95%', score: 91, bestArea: 'Hoshangabad Road & Kolar' },
        'Vi': { dl: 104, ul: 32, ping: 28, cov5g: '66%', score: 75, bestArea: 'New Market' },
        'BSNL': { dl: 46, ul: 18, ping: 43, cov5g: '33%', score: 63, bestArea: 'Vallabh Bhawan Secretariat' }
      },
      'Jabalpur': {
        'Jio': { dl: 218, ul: 54, ping: 17, cov5g: '93%', score: 89, bestArea: 'Civil Lines & Wright Town' },
        'Airtel': { dl: 222, ul: 56, ping: 16, cov5g: '94%', score: 90, bestArea: 'Napier Town & Golbazar' },
        'Vi': { dl: 86, ul: 26, ping: 33, cov5g: '56%', score: 71, bestArea: 'Lordganj' },
        'BSNL': { dl: 42, ul: 15, ping: 47, cov5g: '30%', score: 61, bestArea: 'Khamaria' }
      },
      'Gwalior': {
        'Jio': { dl: 212, ul: 52, ping: 18, cov5g: '92%', score: 88, bestArea: 'City Centre & Lashkar' },
        'Airtel': { dl: 216, ul: 54, ping: 17, cov5g: '93%', score: 89, bestArea: 'Morar & Maharaj Bada' },
        'Vi': { dl: 82, ul: 25, ping: 34, cov5g: '54%', score: 70, bestArea: 'Phalka Bazar' },
        'BSNL': { dl: 40, ul: 14, ping: 48, cov5g: '29%', score: 60, bestArea: 'Jayendraganj' }
      }
    },
    'Maharashtra': {
      'Mumbai': {
        'Jio': { dl: 270, ul: 70, ping: 11, cov5g: '98%', score: 95, bestArea: 'BKC Ultra Hub & Lower Parel' },
        'Airtel': { dl: 262, ul: 68, ping: 12, cov5g: '97%', score: 94, bestArea: 'Nariman Point & Andheri East' },
        'Vi': { dl: 120, ul: 38, ping: 24, cov5g: '74%', score: 79, bestArea: 'Bandra West & Worli Seaface' },
        'BSNL': { dl: 54, ul: 20, ping: 38, cov5g: '36%', score: 65, bestArea: 'Subsea BKC & Fort Heritage' }
      },
      'Pune': {
        'Jio': { dl: 265, ul: 66, ping: 12, cov5g: '97%', score: 94, bestArea: 'Hinjawadi IT Park & Magarpatta' },
        'Airtel': { dl: 258, ul: 64, ping: 13, cov5g: '96%', score: 93, bestArea: 'Viman Nagar & Baner High Street' },
        'Vi': { dl: 116, ul: 36, ping: 25, cov5g: '72%', score: 78, bestArea: 'FC Road & Koregaon Park' },
        'BSNL': { dl: 50, ul: 19, ping: 40, cov5g: '34%', score: 64, bestArea: 'Bajirao Road' }
      },
      'Nagpur': {
        'Jio': { dl: 235, ul: 58, ping: 15, cov5g: '95%', score: 91, bestArea: 'MIHAN SEZ & Civil Lines' },
        'Airtel': { dl: 240, ul: 60, ping: 14, cov5g: '96%', score: 92, bestArea: 'Dharampeth & Ramdaspeth' },
        'Vi': { dl: 98, ul: 30, ping: 29, cov5g: '64%', score: 75, bestArea: 'Sitabuldi' },
        'BSNL': { dl: 46, ul: 17, ping: 44, cov5g: '32%', score: 62, bestArea: 'Zero Mile Exchange' }
      },
      'Nashik': {
        'Jio': { dl: 228, ul: 56, ping: 16, cov5g: '94%', score: 90, bestArea: 'College Road & Gangapur Road' },
        'Airtel': { dl: 232, ul: 58, ping: 15, cov5g: '95%', score: 91, bestArea: 'Indira Nagar & Satpur MIDC' },
        'Vi': { dl: 92, ul: 28, ping: 30, cov5g: '60%', score: 73, bestArea: 'Main Road Market' },
        'BSNL': { dl: 42, ul: 15, ping: 46, cov5g: '30%', score: 61, bestArea: 'Canada Corner' }
      },
      'Chhatrapati Sambhajinagar': {
        'Jio': { dl: 220, ul: 54, ping: 17, cov5g: '93%', score: 89, bestArea: 'CIDCO Cannaught & Chikalthana' },
        'Airtel': { dl: 225, ul: 56, ping: 16, cov5g: '94%', score: 90, bestArea: 'Jalna Road & Samarth Nagar' },
        'Vi': { dl: 88, ul: 26, ping: 32, cov5g: '58%', score: 72, bestArea: 'Gulmandi' },
        'BSNL': { dl: 40, ul: 14, ping: 48, cov5g: '28%', score: 59, bestArea: 'Railway Station Area' }
      }
    },
    'Manipur': {
      'Imphal': {
        'Jio': { dl: 188, ul: 44, ping: 22, cov5g: '88%', score: 86, bestArea: 'Thangal Bazaar & Airport Road' },
        'Airtel': { dl: 195, ul: 48, ping: 20, cov5g: '90%', score: 88, bestArea: 'Kangla Corridor & Lamphelpat' },
        'Vi': { dl: 66, ul: 18, ping: 40, cov5g: '42%', score: 64, bestArea: 'Paona Bazaar' },
        'BSNL': { dl: 46, ul: 17, ping: 43, cov5g: '35%', score: 63, bestArea: 'Secretariat Complex' }
      },
      'Churachandpur': {
        'Jio': { dl: 162, ul: 38, ping: 26, cov5g: '82%', score: 82, bestArea: 'Tedim Road' },
        'Airtel': { dl: 168, ul: 40, ping: 24, cov5g: '84%', score: 84, bestArea: 'New Bazaar' },
        'Vi': { dl: 52, ul: 15, ping: 44, cov5g: '36%', score: 60, bestArea: 'IB Road' },
        'BSNL': { dl: 40, ul: 14, ping: 47, cov5g: '30%', score: 60, bestArea: 'DC Office Compound' }
      }
    },
    'Meghalaya': {
      'Shillong': {
        'Jio': { dl: 215, ul: 52, ping: 18, cov5g: '92%', score: 89, bestArea: 'Police Bazaar & Laitumkhrah' },
        'Airtel': { dl: 222, ul: 56, ping: 16, cov5g: '94%', score: 91, bestArea: 'NEHU Campus & Secretariat' },
        'Vi': { dl: 78, ul: 24, ping: 36, cov5g: '52%', score: 68, bestArea: 'Barabazar' },
        'BSNL': { dl: 48, ul: 18, ping: 41, cov5g: '36%', score: 65, bestArea: 'Telecom Bhawan PMG' }
      },
      'Tura': {
        'Jio': { dl: 172, ul: 40, ping: 24, cov5g: '85%', score: 84, bestArea: 'Tura Bazaar & Hawakhana' },
        'Airtel': { dl: 178, ul: 42, ping: 22, cov5g: '86%', score: 85, bestArea: 'Chandmary & Ringre' },
        'Vi': { dl: 58, ul: 16, ping: 42, cov5g: '38%', score: 62, bestArea: 'Bramhanpara' },
        'BSNL': { dl: 42, ul: 15, ping: 46, cov5g: '32%', score: 61, bestArea: 'District Council' }
      }
    },
    'Mizoram': {
      'Aizawl': {
        'Jio': { dl: 195, ul: 48, ping: 20, cov5g: '90%', score: 87, bestArea: 'Bara Bazaar & Chanmari' },
        'Airtel': { dl: 202, ul: 50, ping: 19, cov5g: '91%', score: 89, bestArea: 'Zarkawt & Khatla Secretariat' },
        'Vi': { dl: 68, ul: 20, ping: 39, cov5g: '45%', score: 65, bestArea: 'Bawngkawn' },
        'BSNL': { dl: 46, ul: 17, ping: 43, cov5g: '35%', score: 64, bestArea: 'Tuikhuahtlang' }
      },
      'Lunglei': {
        'Jio': { dl: 165, ul: 38, ping: 25, cov5g: '83%', score: 83, bestArea: 'Venglai & Bazar Veng' },
        'Airtel': { dl: 170, ul: 40, ping: 24, cov5g: '85%', score: 84, bestArea: 'Chanmari & Rahsi Veng' },
        'Vi': { dl: 54, ul: 15, ping: 44, cov5g: '36%', score: 61, bestArea: 'Farm Veng' },
        'BSNL': { dl: 41, ul: 14, ping: 47, cov5g: '31%', score: 60, bestArea: 'DC Office Road' }
      }
    },
    'Nagaland': {
      'Kohima': {
        'Jio': { dl: 198, ul: 48, ping: 20, cov5g: '90%', score: 87, bestArea: 'Main Town & High School Junction' },
        'Airtel': { dl: 205, ul: 52, ping: 18, cov5g: '92%', score: 89, bestArea: 'Secretariat Complex & PR Hill' },
        'Vi': { dl: 72, ul: 22, ping: 38, cov5g: '48%', score: 66, bestArea: 'Razhu Point' },
        'BSNL': { dl: 48, ul: 18, ping: 42, cov5g: '36%', score: 64, bestArea: 'Old NST Area' }
      },
      'Dimapur': {
        'Jio': { dl: 215, ul: 52, ping: 18, cov5g: '92%', score: 89, bestArea: 'Circular Road & Supermarket' },
        'Airtel': { dl: 220, ul: 54, ping: 17, cov5g: '93%', score: 90, bestArea: 'Nyamo Lotha Road & Purana Bazaar' },
        'Vi': { dl: 82, ul: 25, ping: 34, cov5g: '54%', score: 70, bestArea: 'Hong Kong Market' },
        'BSNL': { dl: 45, ul: 16, ping: 44, cov5g: '33%', score: 63, bestArea: 'Midland' }
      }
    },
    'Odisha': {
      'Bhubaneswar': {
        'Jio': { dl: 255, ul: 64, ping: 12, cov5g: '97%', score: 93, bestArea: 'Infocity Patia & Saheed Nagar' },
        'Airtel': { dl: 250, ul: 62, ping: 13, cov5g: '96%', score: 92, bestArea: 'Nayapalli & Jaydev Vihar' },
        'Vi': { dl: 106, ul: 34, ping: 27, cov5g: '68%', score: 76, bestArea: 'Master Canteen Square' },
        'BSNL': { dl: 48, ul: 18, ping: 41, cov5g: '35%', score: 64, bestArea: 'Secretariat & PMG' }
      },
      'Cuttack': {
        'Jio': { dl: 228, ul: 56, ping: 16, cov5g: '94%', score: 90, bestArea: 'Badambadi & CDA Sectors' },
        'Airtel': { dl: 232, ul: 58, ping: 15, cov5g: '95%', score: 91, bestArea: 'Link Road & Ranihat' },
        'Vi': { dl: 90, ul: 28, ping: 31, cov5g: '58%', score: 72, bestArea: 'Choudhury Bazaar' },
        'BSNL': { dl: 42, ul: 15, ping: 46, cov5g: '30%', score: 61, bestArea: 'Buxi Bazaar' }
      },
      'Rourkela': {
        'Jio': { dl: 218, ul: 54, ping: 17, cov5g: '93%', score: 89, bestArea: 'Civil Township & NIT Campus' },
        'Airtel': { dl: 222, ul: 56, ping: 16, cov5g: '94%', score: 90, bestArea: 'Sector 5 Market & Panposh' },
        'Vi': { dl: 84, ul: 26, ping: 33, cov5g: '55%', score: 70, bestArea: 'Daily Market' },
        'BSNL': { dl: 41, ul: 15, ping: 47, cov5g: '30%', score: 60, bestArea: 'Steel Plant Complex' }
      },
      'Puri': {
        'Jio': { dl: 210, ul: 50, ping: 18, cov5g: '92%', score: 88, bestArea: 'Grand Road & Sea Beach VIP' },
        'Airtel': { dl: 215, ul: 52, ping: 17, cov5g: '93%', score: 89, bestArea: 'VIP Road & Marine Drive' },
        'Vi': { dl: 80, ul: 24, ping: 35, cov5g: '52%', score: 69, bestArea: 'Bada Danda Market' },
        'BSNL': { dl: 40, ul: 14, ping: 48, cov5g: '29%', score: 59, bestArea: 'Chakratirtha Road' }
      }
    },
    'Punjab': {
      'Ludhiana': {
        'Jio': { dl: 248, ul: 62, ping: 13, cov5g: '96%', score: 92, bestArea: 'Model Town & Ferozepur Road' },
        'Airtel': { dl: 252, ul: 64, ping: 12, cov5g: '97%', score: 93, bestArea: 'Sarabha Nagar & Mall Road' },
        'Vi': { dl: 110, ul: 34, ping: 26, cov5g: '70%', score: 76, bestArea: 'Ghumar Mandi' },
        'BSNL': { dl: 48, ul: 18, ping: 42, cov5g: '34%', score: 63, bestArea: 'Bharat Nagar Chowk' }
      },
      'Amritsar': {
        'Jio': { dl: 240, ul: 60, ping: 14, cov5g: '95%', score: 91, bestArea: 'Ranjit Avenue & Heritage Street' },
        'Airtel': { dl: 245, ul: 62, ping: 13, cov5g: '96%', score: 92, bestArea: 'Mall Road & Lawrence Road' },
        'Vi': { dl: 104, ul: 32, ping: 28, cov5g: '66%', score: 75, bestArea: 'Hall Bazaar' },
        'BSNL': { dl: 46, ul: 17, ping: 44, cov5g: '32%', score: 62, bestArea: 'Court Road' }
      },
      'Jalandhar': {
        'Jio': { dl: 232, ul: 58, ping: 15, cov5g: '94%', score: 90, bestArea: 'Model Town & BMC Chowk' },
        'Airtel': { dl: 236, ul: 60, ping: 14, cov5g: '95%', score: 91, bestArea: 'PPR Mall Area & Cantt Road' },
        'Vi': { dl: 98, ul: 30, ping: 29, cov5g: '64%', score: 74, bestArea: 'Rainak Bazaar' },
        'BSNL': { dl: 44, ul: 16, ping: 45, cov5g: '31%', score: 61, bestArea: 'Civil Lines' }
      },
      'Mohali / SAS Nagar': {
        'Jio': { dl: 262, ul: 66, ping: 11, cov5g: '98%', score: 94, bestArea: 'Phase 7 & Quark City IT Corridor' },
        'Airtel': { dl: 268, ul: 68, ping: 10, cov5g: '98%', score: 95, bestArea: 'Phase 8 Industrial & Sector 70' },
        'Vi': { dl: 118, ul: 38, ping: 24, cov5g: '74%', score: 78, bestArea: 'Phase 3B2 Commercial' },
        'BSNL': { dl: 52, ul: 20, ping: 37, cov5g: '38%', score: 66, bestArea: 'Phase 5 Exchange' }
      }
    },
    'Rajasthan': {
      'Jaipur': {
        'Jio': { dl: 255, ul: 64, ping: 12, cov5g: '97%', score: 93, bestArea: 'Malviya Nagar & Vaishali Nagar' },
        'Airtel': { dl: 260, ul: 66, ping: 11, cov5g: '98%', score: 94, bestArea: 'C-Scheme & Tonk Road' },
        'Vi': { dl: 114, ul: 36, ping: 25, cov5g: '72%', score: 77, bestArea: 'MI Road & Mansarovar' },
        'BSNL': { dl: 48, ul: 18, ping: 41, cov5g: '35%', score: 64, bestArea: 'Secretariat & Jawahar Circle' }
      },
      'Jodhpur': {
        'Jio': { dl: 230, ul: 58, ping: 15, cov5g: '94%', score: 90, bestArea: 'Shastri Nagar & Sardarpura' },
        'Airtel': { dl: 234, ul: 60, ping: 14, cov5g: '95%', score: 91, bestArea: 'Ratanada & Circuit House' },
        'Vi': { dl: 94, ul: 28, ping: 30, cov5g: '60%', score: 73, bestArea: 'Clock Tower Market' },
        'BSNL': { dl: 42, ul: 15, ping: 46, cov5g: '31%', score: 61, bestArea: 'Residency Road' }
      },
      'Udaipur': {
        'Jio': { dl: 225, ul: 56, ping: 16, cov5g: '93%', score: 90, bestArea: 'Fateh Sagar & Sukhadia Circle' },
        'Airtel': { dl: 230, ul: 58, ping: 15, cov5g: '94%', score: 91, bestArea: 'Panchwati & Hiran Magri' },
        'Vi': { dl: 90, ul: 28, ping: 31, cov5g: '58%', score: 72, bestArea: 'Bapu Bazaar' },
        'BSNL': { dl: 41, ul: 15, ping: 47, cov5g: '30%', score: 60, bestArea: 'Chetak Circle' }
      },
      'Kota': {
        'Jio': { dl: 220, ul: 54, ping: 17, cov5g: '93%', score: 89, bestArea: 'Vigyan Nagar & Landmark City (Coaching Hub)' },
        'Airtel': { dl: 225, ul: 56, ping: 16, cov5g: '94%', score: 90, bestArea: 'Indra Vihar & Talwandi' },
        'Vi': { dl: 88, ul: 26, ping: 32, cov5g: '56%', score: 71, bestArea: 'Gumanpura' },
        'BSNL': { dl: 40, ul: 14, ping: 48, cov5g: '29%', score: 59, bestArea: 'Chawani' }
      }
    },
    'Sikkim': {
      'Gangtok': {
        'Jio': { dl: 205, ul: 50, ping: 19, cov5g: '91%', score: 88, bestArea: 'MG Marg & Deorali' },
        'Airtel': { dl: 212, ul: 54, ping: 17, cov5g: '93%', score: 90, bestArea: 'Tadong IT Hub & Development Area' },
        'Vi': { dl: 72, ul: 22, ping: 38, cov5g: '48%', score: 66, bestArea: 'Lal Bazaar' },
        'BSNL': { dl: 48, ul: 18, ping: 41, cov5g: '38%', score: 65, bestArea: 'Secretariat & Ridge Park' }
      },
      'Namchi': {
        'Jio': { dl: 175, ul: 42, ping: 23, cov5g: '86%', score: 84, bestArea: 'Char Dham Corridor' },
        'Airtel': { dl: 180, ul: 44, ping: 22, cov5g: '87%', score: 85, bestArea: 'Central Park & Helipad' },
        'Vi': { dl: 60, ul: 18, ping: 42, cov5g: '40%', score: 62, bestArea: 'Namchi Bazaar' },
        'BSNL': { dl: 42, ul: 15, ping: 46, cov5g: '32%', score: 61, bestArea: 'District HQ' }
      }
    },
    'Tamil Nadu': {
      'Chennai': {
        'Jio': { dl: 272, ul: 70, ping: 11, cov5g: '98%', score: 95, bestArea: 'OMR IT Expressway & Guindy Tech Park' },
        'Airtel': { dl: 265, ul: 68, ping: 12, cov5g: '97%', score: 94, bestArea: 'T. Nagar & Anna Nagar Corridor' },
        'Vi': { dl: 118, ul: 38, ping: 24, cov5g: '74%', score: 78, bestArea: 'Nungambakkam & Velachery' },
        'BSNL': { dl: 56, ul: 22, ping: 36, cov5g: '40%', score: 68, bestArea: 'Chennai Subsea Terminal & Mount Road' }
      },
      'Coimbatore': {
        'Jio': { dl: 248, ul: 62, ping: 13, cov5g: '96%', score: 92, bestArea: 'Tidel Park & RS Puram' },
        'Airtel': { dl: 252, ul: 64, ping: 12, cov5g: '97%', score: 93, bestArea: 'Gandhipuram & Avinashi Road' },
        'Vi': { dl: 106, ul: 34, ping: 27, cov5g: '68%', score: 76, bestArea: 'Saibaba Colony' },
        'BSNL': { dl: 48, ul: 18, ping: 42, cov5g: '34%', score: 64, bestArea: 'Race Course Road' }
      },
      'Madurai': {
        'Jio': { dl: 228, ul: 56, ping: 16, cov5g: '94%', score: 90, bestArea: 'KK Nagar & Anna Nagar' },
        'Airtel': { dl: 232, ul: 58, ping: 15, cov5g: '95%', score: 91, bestArea: 'Bypass Road & Simmakkal' },
        'Vi': { dl: 92, ul: 28, ping: 30, cov5g: '60%', score: 73, bestArea: 'Town Hall Road' },
        'BSNL': { dl: 44, ul: 16, ping: 45, cov5g: '31%', score: 62, bestArea: 'Tallakulam' }
      },
      'Tiruchirappalli': {
        'Jio': { dl: 222, ul: 54, ping: 17, cov5g: '93%', score: 89, bestArea: 'Thillai Nagar & Cantonment' },
        'Airtel': { dl: 226, ul: 56, ping: 16, cov5g: '94%', score: 90, bestArea: 'NIT Trichy & KK Nagar' },
        'Vi': { dl: 88, ul: 26, ping: 32, cov5g: '58%', score: 72, bestArea: 'Main Guard Gate' },
        'BSNL': { dl: 42, ul: 15, ping: 46, cov5g: '30%', score: 61, bestArea: 'Central Bus Stand Area' }
      }
    },
    'Telangana': {
      'Hyderabad': {
        'Jio': { dl: 278, ul: 72, ping: 10, cov5g: '99%', score: 96, bestArea: 'HITEC City & Gachibowli Financial Dist' },
        'Airtel': { dl: 272, ul: 70, ping: 11, cov5g: '98%', score: 95, bestArea: 'Madhapur & Jubilee Hills' },
        'Vi': { dl: 122, ul: 40, ping: 23, cov5g: '76%', score: 80, bestArea: 'Banjara Hills & Begumpet' },
        'BSNL': { dl: 54, ul: 20, ping: 37, cov5g: '38%', score: 66, bestArea: 'Abids Peering Node & Secunderabad' }
      },
      'Warangal': {
        'Jio': { dl: 220, ul: 54, ping: 17, cov5g: '93%', score: 89, bestArea: 'Hanamkonda & NIT Warangal' },
        'Airtel': { dl: 225, ul: 56, ping: 16, cov5g: '94%', score: 90, bestArea: 'Kazipet & Nakkalagutta' },
        'Vi': { dl: 86, ul: 26, ping: 32, cov5g: '56%', score: 71, bestArea: 'Chowrastha' },
        'BSNL': { dl: 42, ul: 15, ping: 47, cov5g: '30%', score: 60, bestArea: 'Subedari' }
      },
      'Nizamabad': {
        'Jio': { dl: 208, ul: 50, ping: 19, cov5g: '91%', score: 88, bestArea: 'Khaleelwadi & Hyderabad Road' },
        'Airtel': { dl: 212, ul: 52, ping: 18, cov5g: '92%', score: 89, bestArea: 'Armoor Road & Collectorate' },
        'Vi': { dl: 78, ul: 24, ping: 35, cov5g: '52%', score: 68, bestArea: 'Ganj Market' },
        'BSNL': { dl: 39, ul: 14, ping: 49, cov5g: '28%', score: 58, bestArea: 'Pragathi Nagar' }
      }
    },
    'Tripura': {
      'Agartala': {
        'Jio': { dl: 208, ul: 52, ping: 18, cov5g: '92%', score: 89, bestArea: 'Akhaura Road & Palace Compound' },
        'Airtel': { dl: 214, ul: 54, ping: 17, cov5g: '93%', score: 90, bestArea: 'Kunjaban Secretariat & VIP Road' },
        'Vi': { dl: 74, ul: 22, ping: 37, cov5g: '50%', score: 67, bestArea: 'Battala Market' },
        'BSNL': { dl: 48, ul: 18, ping: 41, cov5g: '38%', score: 65, bestArea: 'Akhaura International Gateway Hub' }
      },
      'Udaipur': {
        'Jio': { dl: 172, ul: 40, ping: 24, cov5g: '85%', score: 84, bestArea: 'Matabari & Town Area' },
        'Airtel': { dl: 178, ul: 42, ping: 23, cov5g: '86%', score: 85, bestArea: 'Central Road' },
        'Vi': { dl: 58, ul: 16, ping: 42, cov5g: '38%', score: 62, bestArea: 'Old Bazaar' },
        'BSNL': { dl: 40, ul: 14, ping: 47, cov5g: '30%', score: 60, bestArea: 'Court Compound' }
      }
    },
    'Uttar Pradesh': {
      'Lucknow': {
        'Jio': { dl: 258, ul: 64, ping: 12, cov5g: '97%', score: 93, bestArea: 'Gomti Nagar & Hazratganj' },
        'Airtel': { dl: 252, ul: 62, ping: 13, cov5g: '96%', score: 92, bestArea: 'Aliganj & Vibhuti Khand IT Corridor' },
        'Vi': { dl: 112, ul: 36, ping: 26, cov5g: '70%', score: 77, bestArea: 'Aminabad & Chowk Commercial' },
        'BSNL': { dl: 48, ul: 18, ping: 42, cov5g: '34%', score: 64, bestArea: 'Vidhan Sabha Marg & Telibagh' }
      },
      'Kanpur': {
        'Jio': { dl: 242, ul: 60, ping: 14, cov5g: '96%', score: 92, bestArea: 'Civil Lines & Swaroop Nagar' },
        'Airtel': { dl: 246, ul: 62, ping: 13, cov5g: '96%', score: 93, bestArea: 'Kakadeo & Mall Road' },
        'Vi': { dl: 104, ul: 32, ping: 28, cov5g: '66%', score: 75, bestArea: 'Naveen Market' },
        'BSNL': { dl: 46, ul: 17, ping: 44, cov5g: '32%', score: 63, bestArea: 'Mall Road Exchange' }
      },
      'Varanasi': {
        'Jio': { dl: 238, ul: 60, ping: 14, cov5g: '95%', score: 92, bestArea: 'BHU Campus & Sigra' },
        'Airtel': { dl: 242, ul: 62, ping: 13, cov5g: '96%', score: 93, bestArea: 'Cantt & Godowlia Heritage Corridor' },
        'Vi': { dl: 98, ul: 30, ping: 29, cov5g: '64%', score: 74, bestArea: 'Chowk' },
        'BSNL': { dl: 45, ul: 16, ping: 45, cov5g: '33%', score: 62, bestArea: 'Kashi Corridor Area' }
      },
      'Noida / Greater Noida': {
        'Jio': { dl: 275, ul: 70, ping: 10, cov5g: '99%', score: 96, bestArea: 'Sector 62 IT Hub & Pari Chowk' },
        'Airtel': { dl: 278, ul: 72, ping: 10, cov5g: '99%', score: 96, bestArea: 'Sector 18 & Expressway Corridor' },
        'Vi': { dl: 120, ul: 38, ping: 23, cov5g: '74%', score: 79, bestArea: 'Atta Market & Sector 16' },
        'BSNL': { dl: 52, ul: 20, ping: 37, cov5g: '38%', score: 66, bestArea: 'Sector 19 Telecom' }
      },
      'Agra': {
        'Jio': { dl: 230, ul: 58, ping: 15, cov5g: '94%', score: 91, bestArea: 'Fatehabad Road & Sanjay Place' },
        'Airtel': { dl: 234, ul: 60, ping: 14, cov5g: '95%', score: 91, bestArea: 'Civil Lines & Kamla Nagar' },
        'Vi': { dl: 94, ul: 28, ping: 30, cov5g: '60%', score: 73, bestArea: 'Raja Ki Mandi' },
        'BSNL': { dl: 43, ul: 15, ping: 46, cov5g: '31%', score: 61, bestArea: 'Taj Ganj' }
      },
      'Prayagraj': {
        'Jio': { dl: 228, ul: 56, ping: 16, cov5g: '94%', score: 90, bestArea: 'Civil Lines & University Area' },
        'Airtel': { dl: 232, ul: 58, ping: 15, cov5g: '95%', score: 91, bestArea: 'Georgetown & Katra' },
        'Vi': { dl: 90, ul: 28, ping: 31, cov5g: '58%', score: 72, bestArea: 'Chowk Market' },
        'BSNL': { dl: 42, ul: 15, ping: 47, cov5g: '30%', score: 60, bestArea: 'High Court Area' }
      }
    },
    'Uttarakhand': {
      'Dehradun': {
        'Jio': { dl: 240, ul: 60, ping: 14, cov5g: '95%', score: 92, bestArea: 'Rajpur Road & IT Park Sahastradhara' },
        'Airtel': { dl: 245, ul: 62, ping: 13, cov5g: '96%', score: 93, bestArea: 'Paltan Bazaar & Jakhan' },
        'Vi': { dl: 102, ul: 32, ping: 28, cov5g: '66%', score: 75, bestArea: 'Clock Tower Corridor' },
        'BSNL': { dl: 48, ul: 18, ping: 42, cov5g: '35%', score: 64, bestArea: 'Secretariat & FRI' }
      },
      'Haridwar / Roorkee': {
        'Jio': { dl: 224, ul: 56, ping: 16, cov5g: '93%', score: 90, bestArea: 'SIDCUL Industrial & Har Ki Pauri' },
        'Airtel': { dl: 228, ul: 58, ping: 15, cov5g: '94%', score: 91, bestArea: 'IIT Roorkee & Ranipur Mor' },
        'Vi': { dl: 88, ul: 26, ping: 32, cov5g: '58%', score: 72, bestArea: 'Jwalapur' },
        'BSNL': { dl: 42, ul: 15, ping: 46, cov5g: '30%', score: 61, bestArea: 'Roshnabad' }
      },
      'Haldwani / Nainital': {
        'Jio': { dl: 212, ul: 52, ping: 18, cov5g: '92%', score: 88, bestArea: 'Kaladhungi Road & Nainital Mall' },
        'Airtel': { dl: 218, ul: 54, ping: 17, cov5g: '93%', score: 89, bestArea: 'Bareilly Road & Tallital' },
        'Vi': { dl: 80, ul: 24, ping: 35, cov5g: '52%', score: 69, bestArea: 'Tikonia' },
        'BSNL': { dl: 40, ul: 14, ping: 48, cov5g: '29%', score: 59, bestArea: 'Mallital' }
      }
    },
    'West Bengal': {
      'Kolkata': {
        'Jio': { dl: 268, ul: 68, ping: 11, cov5g: '98%', score: 94, bestArea: 'Salt Lake Sector V & New Town Tech Hub' },
        'Airtel': { dl: 260, ul: 65, ping: 12, cov5g: '97%', score: 93, bestArea: 'Park Street & Ballygunge' },
        'Vi': { dl: 116, ul: 38, ping: 24, cov5g: '72%', score: 78, bestArea: 'Esplanade & Gariahat' },
        'BSNL': { dl: 52, ul: 20, ping: 38, cov5g: '36%', score: 65, bestArea: 'Kolkata Regional Peering Node & BBD Bagh' }
      },
      'Siliguri': {
        'Jio': { dl: 225, ul: 56, ping: 16, cov5g: '94%', score: 90, bestArea: 'Sevoke Road & City Centre' },
        'Airtel': { dl: 230, ul: 58, ping: 15, cov5g: '95%', score: 91, bestArea: 'Hill Cart Road & Pradhan Nagar' },
        'Vi': { dl: 90, ul: 28, ping: 31, cov5g: '58%', score: 72, bestArea: 'Bidhan Market' },
        'BSNL': { dl: 44, ul: 16, ping: 45, cov5g: '32%', score: 62, bestArea: 'Siliguri Town' }
      },
      'Durgapur / Asansol': {
        'Jio': { dl: 220, ul: 54, ping: 17, cov5g: '93%', score: 89, bestArea: 'City Centre Durgapur & Sen Raleigh Road' },
        'Airtel': { dl: 224, ul: 56, ping: 16, cov5g: '94%', score: 90, bestArea: 'Benachity & Asansol Court' },
        'Vi': { dl: 86, ul: 26, ping: 33, cov5g: '56%', score: 71, bestArea: 'Burnpur' },
        'BSNL': { dl: 41, ul: 15, ping: 47, cov5g: '30%', score: 60, bestArea: 'Steel Township' }
      }
    },
    'Delhi NCR': {
      'New Delhi': {
        'Jio': { dl: 285, ul: 75, ping: 9, cov5g: '99%', score: 97, bestArea: 'Connaught Place & Aerocity' },
        'Airtel': { dl: 280, ul: 72, ping: 10, cov5g: '99%', score: 96, bestArea: 'South Extension & Saket' },
        'Vi': { dl: 128, ul: 42, ping: 22, cov5g: '78%', score: 81, bestArea: 'Khan Market & Nehru Place' },
        'BSNL': { dl: 56, ul: 22, ping: 35, cov5g: '40%', score: 68, bestArea: 'NIXI Peering Hub & CGO Complex' }
      },
      'North / West Delhi': {
        'Jio': { dl: 260, ul: 66, ping: 11, cov5g: '98%', score: 94, bestArea: 'Netaji Subhash Place & Rohini' },
        'Airtel': { dl: 256, ul: 64, ping: 12, cov5g: '97%', score: 93, bestArea: 'Rajouri Garden & Pitampura' },
        'Vi': { dl: 112, ul: 36, ping: 25, cov5g: '70%', score: 77, bestArea: 'Karol Bagh Market' },
        'BSNL': { dl: 50, ul: 19, ping: 39, cov5g: '36%', score: 65, bestArea: 'Civil Lines' }
      }
    },
    'Jammu & Kashmir': {
      'Srinagar': {
        'Jio': { dl: 218, ul: 54, ping: 17, cov5g: '93%', score: 90, bestArea: 'Lal Chowk & Boulevard Dal Lake' },
        'Airtel': { dl: 225, ul: 56, ping: 16, cov5g: '94%', score: 91, bestArea: 'Rajbagh & Hyderpora' },
        'Vi': { dl: 74, ul: 22, ping: 37, cov5g: '50%', score: 67, bestArea: 'Residency Road' },
        'BSNL': { dl: 50, ul: 19, ping: 40, cov5g: '38%', score: 66, bestArea: 'Civil Secretariat Exchange' }
      },
      'Jammu': {
        'Jio': { dl: 232, ul: 58, ping: 15, cov5g: '94%', score: 91, bestArea: 'Gandhi Nagar & Bahu Plaza' },
        'Airtel': { dl: 236, ul: 60, ping: 14, cov5g: '95%', score: 92, bestArea: 'Channi Himmat & Trikuta Nagar' },
        'Vi': { dl: 90, ul: 28, ping: 31, cov5g: '58%', score: 72, bestArea: 'Raghunath Bazaar' },
        'BSNL': { dl: 46, ul: 18, ping: 43, cov5g: '33%', score: 63, bestArea: 'Rail Head Complex' }
      }
    },
    'Ladakh': {
      'Leh': {
        'Jio': { dl: 180, ul: 42, ping: 24, cov5g: '86%', score: 85, bestArea: 'Main Bazaar & Fort Road' },
        'Airtel': { dl: 188, ul: 46, ping: 22, cov5g: '88%', score: 87, bestArea: 'Airport Road & Choglamsar' },
        'Vi': { dl: 56, ul: 16, ping: 44, cov5g: '36%', score: 61, bestArea: 'Old Town' },
        'BSNL': { dl: 46, ul: 18, ping: 41, cov5g: '38%', score: 64, bestArea: 'SNM Hospital Area & DC Office' }
      },
      'Kargil': {
        'Jio': { dl: 155, ul: 36, ping: 27, cov5g: '80%', score: 81, bestArea: 'Main Market & Baroo' },
        'Airtel': { dl: 160, ul: 38, ping: 26, cov5g: '82%', score: 83, bestArea: 'Suru Valley Road' },
        'Vi': { dl: 48, ul: 14, ping: 46, cov5g: '32%', score: 58, bestArea: 'Lal Chowk Kargil' },
        'BSNL': { dl: 42, ul: 15, ping: 45, cov5g: '35%', score: 62, bestArea: 'Helipad Area' }
      }
    },
    'Chandigarh': {
      'Chandigarh Tri-city': {
        'Jio': { dl: 270, ul: 70, ping: 10, cov5g: '98%', score: 95, bestArea: 'Sector 17 & Sector 35 Hub' },
        'Airtel': { dl: 275, ul: 72, ping: 10, cov5g: '99%', score: 96, bestArea: 'IT Park Kishangarh & Sector 22' },
        'Vi': { dl: 120, ul: 38, ping: 23, cov5g: '74%', score: 79, bestArea: 'Sector 26 & Sector 8' },
        'BSNL': { dl: 52, ul: 20, ping: 37, cov5g: '38%', score: 66, bestArea: 'Sector 34 Telecom Complex' }
      }
    },
    'Puducherry': {
      'Puducherry': {
        'Jio': { dl: 242, ul: 60, ping: 14, cov5g: '96%', score: 92, bestArea: 'White Town French Quarter & Promenade' },
        'Airtel': { dl: 248, ul: 62, ping: 13, cov5g: '96%', score: 93, bestArea: 'Mission Street & Anna Salai' },
        'Vi': { dl: 102, ul: 32, ping: 28, cov5g: '66%', score: 75, bestArea: 'Heritage Town' },
        'BSNL': { dl: 46, ul: 18, ping: 43, cov5g: '33%', score: 63, bestArea: 'Rangapillai Street' }
      }
    },
    'Andaman & Nicobar Islands': {
      'Port Blair': {
        'Jio': { dl: 195, ul: 48, ping: 20, cov5g: '90%', score: 87, bestArea: 'Aberdeen Bazaar & Marina Park' },
        'Airtel': { dl: 204, ul: 52, ping: 18, cov5g: '92%', score: 89, bestArea: 'CANI Subsea Landing & Haddo' },
        'Vi': { dl: 68, ul: 20, ping: 38, cov5g: '44%', score: 65, bestArea: 'Junglighat' },
        'BSNL': { dl: 54, ul: 22, ping: 36, cov5g: '42%', score: 68, bestArea: 'CANI Undersea Landing Station & Secretariat' }
      }
    },
    'Dadra and Nagar Haveli and Daman and Diu': {
      'Daman / Silvassa': {
        'Jio': { dl: 228, ul: 56, ping: 16, cov5g: '94%', score: 90, bestArea: 'Silvassa Industrial GIDC & Nani Daman' },
        'Airtel': { dl: 232, ul: 58, ping: 15, cov5g: '95%', score: 91, bestArea: 'Moti Daman & Piparia' },
        'Vi': { dl: 94, ul: 30, ping: 29, cov5g: '62%', score: 74, bestArea: 'Daman Market' },
        'BSNL': { dl: 42, ul: 15, ping: 46, cov5g: '30%', score: 61, bestArea: 'Collectorate' }
      }
    },
    'Lakshadweep': {
      'Kavaratti': {
        'Jio': { dl: 160, ul: 38, ping: 26, cov5g: '82%', score: 82, bestArea: 'Secretariat & Helipad Area' },
        'Airtel': { dl: 172, ul: 42, ping: 22, cov5g: '86%', score: 85, bestArea: 'KLI Subsea Landing Gateway & Jetty' },
        'Vi': { dl: 48, ul: 14, ping: 46, cov5g: '32%', score: 58, bestArea: 'Old Settlement' },
        'BSNL': { dl: 52, ul: 20, ping: 37, cov5g: '40%', score: 67, bestArea: 'KLI Undersea Fibre Terminal' }
      }
    }
  };

  window.telecomBenchmarkData = telecomData;

  document.addEventListener('DOMContentLoaded', () => {
    initTelecomIntelModule();
  });

  function initTelecomIntelModule() {
    const stateSelect = document.getElementById('select-telecom-state');
    const citySelect = document.getElementById('select-telecom-city');
    const tableBody = document.getElementById('carrier-table-body');
    const compareBadge = document.getElementById('carrier-comparison-highlight');

    if (!stateSelect || !citySelect || !tableBody) return;

    // Populate all 36 States and UTs
    stateSelect.innerHTML = '';
    Object.keys(telecomData).forEach(state => {
      const opt = document.createElement('option');
      opt.value = state;
      opt.textContent = state;
      stateSelect.appendChild(opt);
    });

    function populateCities(state) {
      citySelect.innerHTML = '';
      const cities = Object.keys(telecomData[state] || {});
      cities.forEach(city => {
        const opt = document.createElement('option');
        opt.value = city;
        opt.textContent = city;
        citySelect.appendChild(opt);
      });
      renderCarrierTable(state, cities[0]);
    }

    function renderCarrierTable(state, city) {
      const cityData = (telecomData[state] && telecomData[state][city]) || {};
      tableBody.innerHTML = '';

      let bestCarrier = 'Jio';
      let bestScore = 0;

      const carrierLogos = {
        'Jio': '<span class="carrier-tag jio">JIO 5G</span> Reliance Jio',
        'Airtel': '<span class="carrier-tag airtel">AIRTEL 5G</span> Bharti Airtel',
        'Vi': '<span class="carrier-tag vi">Vi 4G/5G</span> Vodafone Idea',
        'BSNL': '<span class="carrier-tag bsnl">BSNL</span> BSNL Bharat Fibre'
      };

      Object.entries(cityData).forEach(([carrier, stats]) => {
        if (stats.score > bestScore) {
          bestScore = stats.score;
          bestCarrier = carrier;
        }

        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>
            <strong>${carrierLogos[carrier] || carrier}</strong>
            <div style="font-size:11px; color:var(--text-secondary); margin-top:2px;">
              <i class="fa-solid fa-location-dot"></i> Best Zone: <span style="color:var(--text-main); font-weight:600;">${stats.bestArea || 'Central Hub'}</span>
            </div>
          </td>
          <td><span class="speed-pill dl">${stats.dl} Mbps</span></td>
          <td><span class="speed-pill ul">${stats.ul} Mbps</span></td>
          <td><span class="font-mono">${stats.ping} ms</span></td>
          <td><span class="pill pill-success">${stats.cov5g}</span></td>
          <td><div class="score-badge score-${stats.score >= 90 ? 'high' : stats.score >= 75 ? 'med' : 'low'}">${stats.score}/100</div></td>
        `;
        tableBody.appendChild(tr);
      });

      if (compareBadge) {
        const bestInfo = cityData[bestCarrier];
        compareBadge.innerHTML = `<i class="fa-solid fa-trophy" style="color:#f59e0b;"></i> <strong>Top Performer in ${city}, ${state}:</strong> ${bestCarrier} (Score: ${bestScore}/100 with ${bestInfo?.dl} Mbps avg download &bull; Peak area: <em>${bestInfo?.bestArea}</em>)`;
      }
    }

    stateSelect.addEventListener('change', (e) => {
      populateCities(e.target.value);
    });

    citySelect.addEventListener('change', (e) => {
      renderCarrierTable(stateSelect.value, e.target.value);
    });

    // Default to Maharashtra or User detected state
    stateSelect.value = 'Maharashtra';
    populateCities('Maharashtra');

    // Global hook to set region programmatically
    window.setTelecomIntelRegion = function(state, city) {
      if (telecomData[state]) {
        stateSelect.value = state;
        populateCities(state);
        if (city && telecomData[state][city]) {
          citySelect.value = city;
          renderCarrierTable(state, city);
        }
      }
    };
  }
})();
