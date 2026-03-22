"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const LEXICON_ENTRIES = [
  { roman: "sa", nepali: "सा" },
  { roman: "si", nepali: "सि" },
  { roman: "si", nepali: "सी" },
  { roman: "su", nepali: "सु" },
  { roman: "su", nepali: "सू" },
  { roman: "se", nepali: "से" },
  { roman: "sai", nepali: "सै" },
  { roman: "so", nepali: "सो" },
  { roman: "sau", nepali: "सौ" },
  { roman: "sam", nepali: "सं" },
  { roman: "Bhojpur", nepali: "भोजपुर" },
  { roman: "Dhankuta", nepali: "धनकुटा" },
  { roman: "Ilam", nepali: "इलाम" },
  { roman: "Jhapa", nepali: "झापा" },
  { roman: "Khotang", nepali: "खोटाङ" },
  { roman: "Morang", nepali: "मोरङ" },
  { roman: "Okhaldhunga", nepali: "ओखलढुंगा" },
  { roman: "Panchthar", nepali: "पाँचथर" },
  { roman: "Sankhuwasabha", nepali: "संखुवासभा" },
  { roman: "Solukhumbu", nepali: "सोलुखुम्बु" },
  { roman: "Sunsari", nepali: "सुनसरी" },
  { roman: "Taplejung", nepali: "ताप्लेजुङ" },
  { roman: "Terhathum", nepali: "तेह्रथुम" },
  { roman: "Udayapur", nepali: "उदयपुर" },
  { roman: "Bara", nepali: "बारा" },
  { roman: "Dhanusa", nepali: "धनुषा" },
  { roman: "Mahottari", nepali: "महोत्तरी" },
  { roman: "Parsa", nepali: "पर्सा" },
  { roman: "aaja", nepali: "आज" },
  { roman: "Rautahat", nepali: "रौतहट" },
  { roman: "Saptari", nepali: "सप्तरी" },
  { roman: "Sarlahi", nepali: "सर्लाही" },
  { roman: "Siraha", nepali: "सिरहा" },
  { roman: "Bhaktapur", nepali: "भक्तपुर" },
  { roman: "Chitwan", nepali: "चितवन" },
  { roman: "Dhading", nepali: "धादिङ" },
  { roman: "Dolakha", nepali: "दोलखा" },
  { roman: "Kathmandu", nepali: "काठमाडौं" },
  { roman: "Kavrepalanchok", nepali: "काभ्रेपलाञ्चोक" },
  { roman: "Lalitpur", nepali: "ललितपुर" },
  { roman: "Makawanpur", nepali: "मकवानपुर" },
  { roman: "Nuwakot", nepali: "नुवाकोट" },
  { roman: "Ramechhap", nepali: "रामेछाप" },
  { roman: "Rasuwa", nepali: "रसुवा" },
  { roman: "Sindhuli", nepali: "सिन्धुली" },
  { roman: "Sindhupalchok", nepali: "सिन्धुपाल्चोक" },
  { roman: "Baglung", nepali: "बाग्लुङ" },
  { roman: "Gorkha", nepali: "गोरखा" },
  { roman: "Kaski", nepali: "कास्की" },
  { roman: "Lamjung", nepali: "लमजुङ" },
  { roman: "Manang", nepali: "मनाङ" },
  { roman: "Mustang", nepali: "मुस्ताङ" },
  { roman: "Myagdi", nepali: "म्याग्दी" },
  { roman: "Nawalpur", nepali: "नवलपुर" },
  { roman: "Parbat", nepali: "पर्वत" },
  { roman: "Syangja", nepali: "स्याङ्जा" },
  { roman: "Tanahu", nepali: "तनहुँ" },
  { roman: "Arghakhanchi", nepali: "अर्घाखाँची" },
  { roman: "Banke", nepali: "बाँके" },
  { roman: "Bardiya", nepali: "बर्दिया" },
  { roman: "Dang", nepali: "दाङ" },
  { roman: "Gulmi", nepali: "गुल्मी" },
  { roman: "Kapilvastu", nepali: "कपिलवस्तु" },
  { roman: "Parasi", nepali: "परासी" },
  { roman: "Palpa", nepali: "पाल्पा" },
  { roman: "Pyuthan", nepali: "प्युठान" },
  { roman: "Rolpa", nepali: "रोल्पा" },
  { roman: "Rukum", nepali: "रुकुम" },
  { roman: "Rupandehi", nepali: "रुपन्देही" },
  { roman: "Dailekh", nepali: "दैलेख" },
  { roman: "Dolpa", nepali: "डोल्पा" },
  { roman: "Humla", nepali: "हुम्ला" },
  { roman: "Jajarkot", nepali: "जाजरकोट" },
  { roman: "Jumla", nepali: "जुम्ला" },
  { roman: "Kalikot", nepali: "कालिकोट" },
  { roman: "Mugu", nepali: "मुगु" },
  { roman: "Rukum Paschim", nepali: "रुकुम पश्चिम" },
  { roman: "Salyan", nepali: "सल्यान" },
  { roman: "Surkhet", nepali: "सुर्खेत" },
  { roman: "Achham", nepali: "अछाम" },
  { roman: "Baitadi", nepali: "बैतडी" },
  { roman: "Bajhang", nepali: "बझाङ" },
  { roman: "Bajura", nepali: "बाजुरा" },
  { roman: "Dadeldhura", nepali: "डडेल्धुरा" },
  { roman: "Darchula", nepali: "दार्चुला" },
  { roman: "Doti", nepali: "डोटी" },
  { roman: "Kailali", nepali: "कैलाली" },
  { roman: "Kanchanpur", nepali: "कञ्चनपुर" },
  { roman: "Bhojpur", nepali: "भोजपुर" },
  { roman: "Sadananda", nepali: "षडानन्द" },
  { roman: "Tyamkemaiyum", nepali: "टेम्केमैयुङ" },
  { roman: "Ramprasadrai", nepali: "रामप्रसाद राई" },
  { roman: "Arun", nepali: "अरुण" },
  { roman: "Pauwadungma", nepali: "पौवादुङ्मा" },
  { roman: "Salpasilichho", nepali: "साल्पासिलिछो" },
  { roman: "Aamchowk", nepali: "आमचोक" },
  { roman: "Hatuwagadhi", nepali: "हतुवागढी" },
  { roman: "Pakhribaas", nepali: "पाख्रिवास" },
  { roman: "Dhankuta", nepali: "धनकुटा" },
  { roman: "Mahalaxmi", nepali: "महालक्ष्मी" },
  { roman: "Sagurigadhi", nepali: "साँगुरीगढी" },
  { roman: "Khalsa Chhintang Sahidbhumi", nepali: "सहिदभुमि" },
  { roman: "Chhathar Jorpati", nepali: "छथर जोरपाटी" },
  { roman: "Chaubise", nepali: "चौबिसे" },
  { roman: "Illam", nepali: "ईलाम" },
  { roman: "Deumai", nepali: "देउमाई" },
  { roman: "Mai", nepali: "माई" },
  { roman: "Suryodaya", nepali: "सुर्योदय" },
  { roman: "Fakfokthum", nepali: "फाकफोकथुम" },
  { roman: "Chulachuli", nepali: "चुलाचुली" },
  { roman: "Maijogmai", nepali: "माईजोगमाई" },
  { roman: "Mangsebung", nepali: "माङसेबुङ" },
  { roman: "Rong", nepali: "रोङ" },
  { roman: "Sandakpur", nepali: "सन्दकपुर" },
  { roman: "Mechinagar", nepali: "मेचीनगर" },
  { roman: "Damak", nepali: "दमक" },
  { roman: "Kankai", nepali: "कन्काई" },
  { roman: "Bhadrapur", nepali: "भद्रपुर" },
  { roman: "Arjundhara", nepali: "अर्जुनधारा" },
  { roman: "Shivasatakshi", nepali: "शिवसताक्षी" },
  { roman: "Gauradaha", nepali: "गौरादह" },
  { roman: "Birtamod", nepali: "विर्तामोड" },
  { roman: "Kamal", nepali: "कमल" },
  { roman: "Gaurigunj", nepali: "गौरिगंज" },
  { roman: "Barhadashi", nepali: "बाह्रदशी" },
  { roman: "Jhapa", nepali: "झापा" },
  { roman: "Buddhasanti", nepali: "बुद्धशान्ति" },
  { roman: "Haldibari", nepali: "हल्दिबारी" },
  { roman: "Kachankawal", nepali: "कचनकवल" },
  { roman: "Halesituwachung", nepali: "हलेसी तुवाचुङ" },
  { roman: "Rupakot Majhuwagadhi", nepali: "दिक्तेल रुपाकोट मझुवागढी" },
  { roman: "Aiselukharka", nepali: "ऐसेलुखर्क" },
  { roman: "Lamidada", nepali: "लामिडाडा" },
  { roman: "Jantedhunga", nepali: "जन्तेढुंगा" },
  { roman: "Khotehang", nepali: "खोटेहाङ" },
  { roman: "Kepilasgadhi", nepali: "केपिलासगढी" },
  { roman: "Diprung", nepali: "दिप्रुङ" },
  { roman: "Sakela", nepali: "साकेला" },
  { roman: "Barahpokhari", nepali: "वराहपोखरी" },
  { roman: "Biratnagar", nepali: "विराटनगर" },
  { roman: "Belbaari", nepali: "बेलवारी" },
  { roman: "Letang", nepali: "लेटाङ" },
  { roman: "Pathari Sanischare", nepali: "पथरी शनिश्चरे" },
  { roman: "Rangeli", nepali: "रंगेली" },
  { roman: "Ratuwamai", nepali: "रतुवामाई" },
  { roman: "Sunawarsi", nepali: "सुनवर्षी" },
  { roman: "Urlabaari", nepali: "उर्लाबारी" },
  { roman: "Sundarharaincha", nepali: "सुन्दर हरैचा" },
  { roman: "Budhiganga", nepali: "बुढीगंगा" },
  { roman: "Dhanpalthan", nepali: "धनपालथान" },
  { roman: "Gramthan", nepali: "ग्रामथान" },
  { roman: "Jahada", nepali: "जहदा" },
  { roman: "Kanepokhari", nepali: "कानेपोखरी" },
  { roman: "Katahari", nepali: "कटहरी" },
  { roman: "Kerabaari", nepali: "केराबारी" },
  { roman: "Miklajung", nepali: "मिक्लाजुङ" },
  { roman: "Siddhicharan", nepali: "सिद्धिचरण" },
  { roman: "Khijidemwa", nepali: "खिजीदेम्वा" },
  { roman: "Champadevi", nepali: "चम्पादेवी" },
  { roman: "Chisankhugadhi", nepali: "चिशंखुगढी" },
  { roman: "Manebhanjyang", nepali: "मानेभञ्याङ" },
  { roman: "Molung", nepali: "मोलुङ" },
  { roman: "Likhu", nepali: "लिखु" },
  { roman: "Sunkoshi", nepali: "सुनकोशी" },
  { roman: "Fidim", nepali: "फिदिम" },
  { roman: "Falelung", nepali: "फालेलुङ" },
  { roman: "Falgunanda", nepali: "फाल्गुनन्द" },
  { roman: "Hilihang", nepali: "हिलिहाङ" },
  { roman: "Kummayek", nepali: "कुम्मायक" },
  { roman: "Miklajung", nepali: "मिक्लाजुङ" },
  { roman: "Tumwewa", nepali: "तुम्वेवा" },
  { roman: "Yangwarak", nepali: "याङवरक" },
  { roman: "Chainpur", nepali: "चैनपुर" },
  { roman: "Dharmadevi", nepali: "धर्मदेवी" },
  { roman: "Khaadbaari", nepali: "खाँदवारी" },
  { roman: "Madi", nepali: "मादी" },
  { roman: "Paanchkhapan", nepali: "पाँचखपन" },
  { roman: "Bhotkhola", nepali: "भोटखोला" },
  { roman: "Chichila", nepali: "चिचिला" },
  { roman: "Makalu", nepali: "मकालु" },
  { roman: "Sabhapokhari", nepali: "सभापोखरी" },
  { roman: "Silichong", nepali: "सिलीचोङ" },
  { roman: "Solududhkunda", nepali: "सोलुदुधकुण्ड" },
  { roman: "Dudhkoshi", nepali: "दुधकोशी" },
  { roman: "Khumbu Pasang Lhamu", nepali: "खुम्वु पासाङल्हामु" },
  { roman: "Dudhkausika", nepali: "दुधकौसिका" },
  { roman: "Nechasalyan", nepali: "नेचासल्यान" },
  { roman: "Mahakulung", nepali: "माहाकुलुङ" },
  { roman: "Likhu Pike", nepali: "लिखु पिके" },
  { roman: "Sotang", nepali: "सोताङ" },
  { roman: "Itahari", nepali: "इटहरी" },
  { roman: "Dharan", nepali: "धरान" },
  { roman: "Inaruwa", nepali: "इनरुवा" },
  { roman: "Duhabi", nepali: "दुहवी" },
  { roman: "Ramdhuni", nepali: "रामधुनी" },
  { roman: "Barah", nepali: "बराह" },
  { roman: "Dewangunj", nepali: "देवानगञ्ज" },
  { roman: "Koshi", nepali: "कोशी" },
  { roman: "Gadhi", nepali: "गढी" },
  { roman: "Barju", nepali: "बर्जु" },
  { roman: "Bhokraha", nepali: "भोक्राहा" },
  { roman: "Harinagara", nepali: "हरिनगर" },
  { roman: "Fungling", nepali: "फुङलिङ" },
  { roman: "Athrai Tribeni", nepali: "आठराई त्रिवेणी" },
  { roman: "Sidingwa", nepali: "सिदिङ्वा" },
  { roman: "Faktanglung", nepali: "फक्ताङलुङ" },
  { roman: "Mikhwakhola", nepali: "मिक्वाखोला" },
  { roman: "Meringden", nepali: "मेरिङदेन" },
  { roman: "Maiwakhola", nepali: "मैवाखोला" },
  { roman: "Yangwarak", nepali: "याङ्वरक" },
  { roman: "Sirijunga", nepali: "सिरीजङ्घा" },
  { roman: "Myanglung", nepali: "म्याङलुङ" },
  { roman: "Laligurans", nepali: "लालीगुराँस" },
  { roman: "Athrai", nepali: "आठराई" },
  { roman: "Chhathar", nepali: "छथर" },
  { roman: "Fedaap", nepali: "फेदाप" },
  { roman: "Menchhayayem", nepali: "मेन्छयायेम" },
  { roman: "Katari", nepali: "कटारी" },
  { roman: "Chaudandagadhi", nepali: "चौदण्डीगढी" },
  { roman: "Triyuga", nepali: "त्रियुगा" },
  { roman: "Belaka", nepali: "वेलका" },
  { roman: "Udaypurgadhi", nepali: "उदयपुरगढी" },
  { roman: "Tapli", nepali: "ताप्ली" },
  { roman: "Rautamai", nepali: "रौतामाई" },
  { roman: "Sunkoshi", nepali: "सुनकोशी" },
  { roman: "Newar", nepali: "नेवार" },
  { roman: "ram", nepali: "राम" },
  { roman: "Kalaiya", nepali: "कलैया" },
  { roman: "Jitpursimara", nepali: "जितपुर-सिमरा" },
  { roman: "Kolhawi", nepali: "कोल्हवी" },
  { roman: "Nijgadh", nepali: "निजगढ" },
  { roman: "Mahagadimai", nepali: "महागढीमाई" },
  { roman: "Simraungadh", nepali: "सیم्रौनगढ" },
  { roman: "Adarsha Kotwal", nepali: "आदर्श कोतवाल" },
  { roman: "Adarsha", nepali: "आदर्श" },
  { roman: "Karaiyamai", nepali: "करैयामाई" },
  { roman: "Devtaal", nepali: "देवताल" },
  { roman: "Pachrauta", nepali: "पचरौता" },
  { roman: "Parwanipur", nepali: "परवानीपुर" },
  { roman: "Prasauni", nepali: "प्रसौनी" },
  { roman: "Pheta", nepali: "फेटा" },
  { roman: "Baragadhi", nepali: "बारागढी" },
  { roman: "Subarna", nepali: "सुवर्ण" },
  { roman: "bishrampur", nepali: "विश्रामपुर" },
  { roman: "Janakpur", nepali: "जनकपुर" },
  { roman: "Chhireshwor", nepali: "क्षिरेश्वरनाथ" },
  { roman: "Ganeshman Charnath", nepali: "गणेशमान–चारनाथ" },
  { roman: "Dhanusadham", nepali: "धनुषाधाम" },
  { roman: "Nagarain", nepali: "नगराइन" },
  { roman: "Videha", nepali: "विदेह" },
  { roman: "Mithila", nepali: "मिथिला" },
  { roman: "Sahidnagar", nepali: "शहिदनगर" },
  { roman: "Sabaila", nepali: "सबैला" },
  { roman: "Siddidatri", nepali: "सिद्धिदात्री" },
  { roman: "Janaknandini", nepali: "जनकनन्दिनी" },
  { roman: "Bateshwor", nepali: "बटेश्वर" },
  { roman: "Mithila Bihari", nepali: "मिथिला विहारी" },
  { roman: "Mukhiyapatti musaharmiya", nepali: "मुखियापट्टि मुसहरमिया" },
  { roman: "Laxminiya", nepali: "लक्ष्मीनिया" },
  { roman: "Hansapur", nepali: "हंसपुर" },
  { roman: "kamala", nepali: "कमला" },
  { roman: "Aurahi", nepali: "औरही" },
  { roman: "Jaleshwor", nepali: "जलेश्वर" },
  { roman: "Bardibas", nepali: "बर्दिबास" },
  { roman: "Gausala", nepali: "गौशाला" },
  { roman: "Ekdara", nepali: "एकडारा" },
  { roman: "Sonama", nepali: "सोनमा" },
  { roman: "Samsi", nepali: "साम्सी" },
  { roman: "Loharpatti", nepali: "लोहरपट्टी" },
  { roman: "Ramgopalpur", nepali: "रामगोपालपुर" },
  { roman: "Mahottari", nepali: "महोत्तरी" },
  { roman: "Manara", nepali: "मनरा" },
  { roman: "Matihani", nepali: "मटिहानी" },
  { roman: "Bhanggaha", nepali: "भँगाहा" },
  { roman: "Balawa", nepali: "बलवा" },
  { roman: "Pipara", nepali: "पिपरा" },
  { roman: "Aurahi", nepali: "औरही" },
  { roman: "Birgunj", nepali: "वीरगञ्ज" },
  { roman: "Pokhariya", nepali: "पोखरिया" },
  { roman: "Subarnapur", nepali: "सुवर्णपुर" },
  { roman: "Jagarnathpur", nepali: "जगरनाथपुर" },
  { roman: "Dhobini", nepali: "धोबीनी" },
  { roman: "Chhipaharmai", nepali: "छिपहरमाई" },
  { roman: "Pakaha Mainapur", nepali: "पकाहा मैनपुर" },
  { roman: "Bindabasini", nepali: "बिन्दबासिनी" },
  { roman: "Bahudarmai", nepali: "बहुदरमाई" },
  { roman: "Belawa", nepali: "बेलवा" },
  { roman: "Parsagadhi", nepali: "पर्सागढी" },
  { roman: "Sakhuwa Prasauni", nepali: "सखुवा प्रसौनी" },
  { roman: "Paterwa Sugauli", nepali: "पटेर्वा सुगौली" },
  { roman: "Chandrapur", nepali: "चन्द्रपुर" },
  { roman: "Garuda", nepali: "गरुडा" },
  { roman: "Gaur", nepali: "गौर" },
  { roman: "Baudhimai", nepali: "बौधीमाई" },
  { roman: "Brindaban", nepali: "वृन्दावन" },
  { roman: "Dewahi Gonahi", nepali: "देवाही गोनाही" },
  { roman: "Durga Bhagwati", nepali: "दुर्गाभगवती" },
  { roman: "Durga Bhagwati", nepali: "दुर्गा भगवती" },
  { roman: "Gadhimai", nepali: "गढीमाई" },
  { roman: "Gujara", nepali: "गुजरा" },
  { roman: "Katahariya", nepali: "कटहरीया" },
  { roman: "Madhav Narayan", nepali: "माधवनारायण" },
  { roman: "Maulapur", nepali: "मौलापुर" },
  { roman: "Fatuwa Bijayapur", nepali: "फतुवा विजयपुर" },
  { roman: "Ishanath", nepali: "ईशनाथ" },
  { roman: "Paroha", nepali: "परोहा" },
  { roman: "Rajpur", nepali: "राजपुर" },
  { roman: "yamunamai", nepali: "यमुनामाई" },
  { roman: "rajbiraj", nepali: "राजविराज" },
  { roman: "Kanchanrup", nepali: "कञ्चनरुप" },
  { roman: "Dakneshwori", nepali: "डाक्नेश्वरी" },
  { roman: "Bodebarsain", nepali: "बोदेबरसाईन" },
  { roman: "Khadak", nepali: "खडक" },
  { roman: "Sambhunath", nepali: "शम्भुनाथ" },
  { roman: "Surunga", nepali: "सुरुगां" },
  { roman: "hanumannagar kankalini", nepali: "हनुमाननगर कंकालिनी" },
  { roman: "Krishna sabaran", nepali: "कृष्णासवरन" },
  { roman: "Chhinnamasta", nepali: "छिन्नमस्ता" },
  { roman: "Mahadeva", nepali: "महादेवा" },
  { roman: "rajgadh", nepali: "राजगढ" },
  { roman: "Saptakosi", nepali: "सप्तकोशी" },
  { roman: "Tirahut", nepali: "तिरहुत" },
  { roman: "Tilathi Koiladi", nepali: "तिलाठी कोईलाडी" },
  { roman: "Rupani", nepali: "रुपनी" },
  { roman: "Belhi Chapena", nepali: "बेल्ही चपेना" },
  { roman: "Bishnupur", nepali: "बिष्णुपुर" },
  { roman: "Ishworpur", nepali: "ईश्वरपुर" },
  { roman: "Lalbandi", nepali: "लालबन्दी" },
  { roman: "Haripur", nepali: "हरिपुर" },
  { roman: "Haripurba", nepali: "हरिपुर्वा" },
  { roman: "Hariban", nepali: "हरिवन" },
  { roman: "Barahathawa", nepali: "बरहथवा" },
  { roman: "Balara", nepali: "बलरा" },
  { roman: "Godaita", nepali: "गोडैटा" },
  { roman: "Malangwa", nepali: "मलंगवा" },
  { roman: "Bagmati", nepali: "बागमती" },
  { roman: "Kabilasi", nepali: "कबिलासी" },
  { roman: "Chakraghatta", nepali: "चक्रघट्टा" },
  { roman: "Chandranagar", nepali: "चन्द्रनगर" },
  { roman: "Dhankaul", nepali: "धनकौल" },
  { roman: "basbariya", nepali: "बसबरीया" },
  { roman: "Bramhapuri", nepali: "ब्रह्मपुरी" },
  { roman: "Ramnagar", nepali: "रामनगर" },
  { roman: "Bishnu", nepali: "विष्णु" },
  { roman: "Lahan", nepali: "लहान" },
  { roman: "Dhangadimai", nepali: "धनगढीमाई" },
  { roman: "Dhangadi", nepali: "धनगढी" },
  { roman: "Siraha", nepali: "सिरहा" },
  { roman: "Golbazar", nepali: "गोलबजार" },
  { roman: "Mirchaiya", nepali: "मिर्चैया" },
  { roman: "Kalyanpur", nepali: "कल्याणपुर" },
  { roman: "Bhagawanpur", nepali: "भगवानपुर" },
  { roman: "Bishnu", nepali: "विष्णु" },
  { roman: "Sukhipur", nepali: "सुखीपुर" },
  { roman: "Karjanha", nepali: "कर्जन्हा" },
  { roman: "Bariyarpatti", nepali: "बरियारपट्टी" },
  { roman: "Laxmipur Patari", nepali: "लक्ष्मीपुर पतारी" },
  { roman: "Naraha", nepali: "नरहा" },
  { roman: "Sakhuwanankarkatti", nepali: "सखुवानान्कारकट्टी" },
  { roman: "Arnama", nepali: "अर्नमा" },
  { roman: "Nawarajpur", nepali: "नवराजपुर" },
  { roman: "Changu Narayan", nepali: "चाँगुनारायण" },
  { roman: "Bhaktapur", nepali: "भक्तपुर" },
  { roman: "Madhyepur", nepali: "मध्यपुर" },
  { roman: "Thimi", nepali: "थिमी" },
  { roman: "Suryebinayak", nepali: "सूर्यविनायक" },
  { roman: "Bharatpur", nepali: "भरतपुर" },
  { roman: "Kalika", nepali: "कालिका" },
  { roman: "Khairhani", nepali: "खैरहनी" },
  { roman: "Madi", nepali: "माडी" },
  { roman: "Ratnanagar", nepali: "रत्ननगर" },
  { roman: "Rapti", nepali: "राप्ती" },
  { roman: "Echyakamana", nepali: "इच्छाकामना" },
  { roman: "Dhunibenshi", nepali: "धुनीबेंसी" },
  { roman: "Nilkantha", nepali: "नीलकण्ठ" },
  { roman: "Khaniyabash", nepali: "खनियाबास" },
  { roman: "Gajuri", nepali: "गजुरी" },
  { roman: "Galchi", nepali: "गल्छी" },
  { roman: "Gangajamuna", nepali: "गङ्गाजमुना" },
  { roman: "Jwalamukhi", nepali: "ज्वालामूखी" },
  { roman: "Thakre", nepali: "थाक्रे" },
  { roman: "Netrabati", nepali: "नेत्रावती" },
  { roman: "Benighat Rorang", nepali: "बेनीघाट रोराङ्ग" },
  { roman: "Rubi Valley", nepali: "रुवी भ्याली" },
  { roman: "Sidhlake", nepali: "सिद्धलेक" },
  { roman: "Tripurasundari", nepali: "त्रिपुरासुन्दरी" },
  { roman: "Jiri", nepali: "जिरी" },
  { roman: "Bhimeshwor", nepali: "भिमेश्वर" },
  { roman: "Kalinchowk", nepali: "कालिन्चोक" },
  { roman: "Gaurishankar", nepali: "गौरीशङ्कर" },
  { roman: "Tamakoshi", nepali: "तामाकोशी" },
  { roman: "Melung", nepali: "मेलुङ्ग" },
  { roman: "Bigu", nepali: "विगु" },
  { roman: "Baiteshwor", nepali: "वैतेश्वर" },
  { roman: "Shailung", nepali: "शैलुङ्ग" },
  { roman: "Dhulikhel", nepali: "धुलिखेल" },
  { roman: "Banepa", nepali: "बनेपा" },
  { roman: "Panauti", nepali: "पनौती" },
  { roman: "Panchkhaal", nepali: "पांचखाल" },
  { roman: "Namobuddha", nepali: "नमोबुद्ध" },
  { roman: "Khanikhola", nepali: "खानीखोला" },
  { roman: "Chaurideurali", nepali: "चौंरीदेउराली" },
  { roman: "Temaal", nepali: "तेमाल" },
  { roman: "Bethanchowk", nepali: "बेथानचोक" },
  { roman: "Bhumlu", nepali: "भुम्लु" },
  { roman: "Mandandeupur", nepali: "मण्डनदेउपुर" },
  { roman: "Mahabharat", nepali: "महाभारत" },
  { roman: "Roshi", nepali: "रोशी" },
  { roman: "Kathmandu", nepali: "काठमाण्डौं" },
  { roman: "Kageshwori", nepali: "कागेश्वरी" },
  { roman: "Kirtipur", nepali: "कीर्तिपुर" },
  { roman: "Gokarneshwor", nepali: "गोकर्णेश्वर" },
  { roman: "Chandragiri", nepali: "चन्द्रागिरी" },
  { roman: "Tokha", nepali: "टोखा" },
  { roman: "Tarkeshwor", nepali: "तारकेश्वर" },
  { roman: "Dakchinkali", nepali: "दक्षिणकाली" },
  { roman: "Nagarjun", nepali: "नागार्जुन" },
  { roman: "Budhanilkantha", nepali: "बुढानिलकण्ठ" },
  { roman: "Shankharapur", nepali: "शंखरापुर" },
  { roman: "Lalitpur", nepali: "ललितपुर" },
  { roman: "Godawari", nepali: "गोदावरी" },
  { roman: "Mahalaxmi", nepali: "महालक्ष्मी" },
  { roman: "Konjyosom", nepali: "कोन्ज्योसोम" },
  { roman: "Bagmati", nepali: "बाग्मती" },
  { roman: "Mahankaal", nepali: "महाङ्काल" },
  { roman: "Hetauda", nepali: "हेटौंडा" },
  { roman: "Thaha", nepali: "थाहा" },
  { roman: "Indrasarobar", nepali: "ईन्द्रसरोवर" },
  { roman: "Kailash", nepali: "कैलाश" },
  { roman: "Bakaiya", nepali: "बकैया" },
  { roman: "Bhimfedi", nepali: "भिमफेदी" },
  { roman: "Makwanpurgadhi", nepali: "मकवानपुरगढी" },
  { roman: "Manhari", nepali: "मनहरी" },
  { roman: "Raksirang", nepali: "राक्सिराङ्ग" },
  { roman: "Bidur", nepali: "विदुर" },
  { roman: "Belkotgadhi", nepali: "बेलकोटगढी" },
  { roman: "Kakani", nepali: "ककनी" },
  { roman: "Kispang", nepali: "किस्पाङ" },
  { roman: "Tadi", nepali: "तादी" },
  { roman: "Dupcheshwor", nepali: "दुप्चेश्वर" },
  { roman: "Panchakanya", nepali: "पञ्चकन्या" },
  { roman: "Likhu", nepali: "लिखु" },
  { roman: "Meghang", nepali: "म्यागङ" },
  { roman: "Shivapuri", nepali: "शिवपुरी" },
  { roman: "Suryegadhi", nepali: "सुर्यगढी" },
  { roman: "Manthali", nepali: "मन्थली" },
  { roman: "Ramechhap", nepali: "रामेछाप" },
  { roman: "Umakunda", nepali: "उमाकुण्ड" },
  { roman: "Khandadevi", nepali: "खाँडादेवी" },
  { roman: "Gokulganga", nepali: "गोकुलगङ्गा" },
  { roman: "Doramba", nepali: "दोरम्बा" },
  { roman: "Sunapati", nepali: "सुनापति" },
  { roman: "Uttargaya", nepali: "उत्तरगया" },
  { roman: "Kalika", nepali: "कालिका" },
  { roman: "Gosainkunda", nepali: "गोसाईंकुण्ड" },
  { roman: "Naukunda", nepali: "नौकुण्ड" },
  { roman: "Kamalamaai", nepali: "कमलामाई" },
  { roman: "Dudhauli", nepali: "दुधौली" },
  { roman: "Golanjor", nepali: "गोलन्जोर" },
  { roman: "Ghyan", nepali: "घ्याङ" },
  { roman: "Tinpatan", nepali: "तीनपाटन" },
  { roman: "Fikkal", nepali: "फिक्कल" },
  { roman: "Marin", nepali: "मरिण" },
  { roman: "Sunkoshi", nepali: "सुनकोशी" },
  { roman: "Hariharpurgadhi", nepali: "हरिहरपुरगढी" },
  { roman: "Sangachowkgadhi", nepali: "सागाचोकगढी" },
  { roman: "Barabise", nepali: "वाह्रविसे" },
  { roman: "Melamchi", nepali: "मेलम्ची" },
  { roman: "Indrabati", nepali: "ईन्द्रावती" },
  { roman: "Jugal", nepali: "जुगल" },
  { roman: "Thanpal", nepali: "थाङपाल" },
  { roman: "Balephi", nepali: "बलेफी" },
  { roman: "Botekoshi", nepali: "भोटेकोशी" },
  { roman: "Lisankhu Pakhar", nepali: "लिसंखुपाखर" },
  { roman: "Helambhu", nepali: "हेलम्बु" },
  { roman: "Tripurasundari", nepali: "त्रिपुरासुन्दरी" },
  { roman: "Baglung", nepali: "बाग्लुङ" },
  { roman: "Galkot", nepali: "गल्कोट" },
  { roman: "Jaimini", nepali: "जैमिनी" },
  { roman: "Dhorpatan", nepali: "ढोरपाटन" },
  { roman: "Bareng", nepali: "वरेङ" },
  { roman: "Kathekhola", nepali: "काठेखोला" },
  { roman: "Tamankhola", nepali: "तमानखोला" },
  { roman: "Tarakhola", nepali: "ताराखोला" },
  { roman: "Nisikhola", nepali: "निसीखोला" },
  { roman: "Badigad", nepali: "वडिगाड" },
  { roman: "Gorkha", nepali: "गोरखा" },
  { roman: "Palungtar", nepali: "पालुङटार" },
  { roman: "Sulikot", nepali: "सुलिकोट" },
  { roman: "Siranchok", nepali: "सिरानचोक" },
  { roman: "Ajirkot", nepali: "अजिरकोट" },
  { roman: "Aarughat", nepali: "आरुघाट" },
  { roman: "Gandaki", nepali: "गण्डकी" },
  { roman: "Chumnubri", nepali: "चुमनुव्री" },
  { roman: "Dharche", nepali: "धार्चे" },
  { roman: "Bhimsen", nepali: "भीमसेन" },
  { roman: "Sahid Lakhan", nepali: "सहिद लखन" },
  { roman: "Pokhara", nepali: "पोखरा" },
  { roman: "Annapurna", nepali: "अन्नपूर्णा" },
  { roman: "Machhapuchhre", nepali: "ममाछापुछ्रे" },
  { roman: "Madi", nepali: "माडी" },
  { roman: "Rupa", nepali: "रुपा" },
  { roman: "Beshisahar", nepali: "बेसीशहर" },
  { roman: "Madhyanepal", nepali: "मध्यनेपाल" },
  { roman: "Rainas", nepali: "राईनास" },
  { roman: "Sundarbajar", nepali: "सुन्दरबजार" },
  { roman: "Kobholasothar", nepali: "क्व्होलासोथार" },
  { roman: "Dudhpokhari", nepali: "दुधपोखरी" },
  { roman: "Dordi", nepali: "दोर्दी" },
  { roman: "Marsyandi", nepali: "मर्स्याङदी" },
  { roman: "Narpa", nepali: "नार्पा" },
  { roman: "Nashon", nepali: "नासोँ" },
  { roman: "Ngisyang", nepali: "ङिस्याङ" },
  { roman: "Chame", nepali: "चामे" },
  { roman: "Gharpajhong", nepali: "घरपझोङ" },
  { roman: "Thasang", nepali: "थासाङ" },
  { roman: "Lo-Ghekar Damodarkunda", nepali: "लो-घेकर दामोदरकुण्ड" },
  { roman: "Lomanthang", nepali: "लोमन्थाङ" },
  { roman: "Barhagaun Muktichhetra", nepali: "वारागुङ मुक्तिक्षेत्र" },
  { roman: "Beni", nepali: "बेनी" },
  { roman: "Annapurna", nepali: "अन्नपूर्णा" },
  { roman: "Dhaulagiri", nepali: "धौलागिरी" },
  { roman: "Mangala", nepali: "मंगला" },
  { roman: "Malika", nepali: "मालिका" },
  { roman: "Raghuganga", nepali: "रघुगंगा" },
  { roman: "Kawasoti", nepali: "कावासोती" },
  { roman: "Gaindakot", nepali: "गैंडाकोट" },
  { roman: "Devchuli", nepali: "देवचुली" },
  { roman: "Madhyabindu", nepali: "मध्यविन्दु" },
  { roman: "Bungdikali", nepali: "बौदीकाली" },
  { roman: "Bulingtar", nepali: "बुलिङटार" },
  { roman: "Binaie", nepali: "बिनयी" },
  { roman: "Hupsekot", nepali: "हुप्सेकोट" },
  { roman: "Kushma", nepali: "कुश्मा" },
  { roman: "Phalewas", nepali: "फलेवास" },
  { roman: "Jaljala", nepali: "जलजला" },
  { roman: "paiyu", nepali: "पैयूं" },
  { roman: "Mahashila", nepali: "महाशिला" },
  { roman: "Modi", nepali: "मोदी" },
  { roman: "Bihadi", nepali: "विहादी" },
  { roman: "Galyang", nepali: "गल्याङ" },
  { roman: "Chapkot", nepali: "चापाकोट" },
  { roman: "Putalibazar", nepali: "पुतलीबजार" },
  { roman: "Virkot", nepali: "विरकोट" },
  { roman: "Waling", nepali: "वालिङ" },
  { roman: "Arjunchaupari", nepali: "अर्जुनचौपरी" },
  { roman: "Aadhikhola", nepali: "आँधिखोला" },
  { roman: "Kaligandaki", nepali: "कालीगण्डकी" },
  { roman: "Fedikhola", nepali: "फेदीखोला" },
  { roman: "Biruwa", nepali: "बिरुवा" },
  { roman: "Harinas", nepali: "हरिनास" },
  { roman: "Bhanu", nepali: "भानु" },
  { roman: "Bhimad", nepali: "भिमाद" },
  { roman: "Byas", nepali: "व्यास" },
  { roman: "Shuklagandaki", nepali: "शुक्लागण्डकी" },
  { roman: "Ambukhaireni", nepali: "आँबुखैरेनी" },
  { roman: "Rhishing", nepali: "ऋषिङ्ग" },
  { roman: "Ghiring", nepali: "घिरिङ" },
  { roman: "Devghat", nepali: "देवघाट" },
  { roman: "Myagdi", nepali: "म्याग्दी" },
  { roman: "Bandipur", nepali: "बन्दिपुर" },
  { roman: "Sandhikharka", nepali: "सन्धिखर्क" },
  { roman: "Sitganga", nepali: "शितगंगाा" },
  { roman: "Bhumikasthan", nepali: "भुमिकास्थान" },
  { roman: "Chhatradev", nepali: "छत्रदेव" },
  { roman: "Pandini", nepali: "पाणिनी" },
  { roman: "Malarani", nepali: "मालारानी" },
  { roman: "Nepalgunj", nepali: "नेपालगञ्ज" },
  { roman: "Koholpur", nepali: "कोहोलपुर" },
  { roman: "Narainapur", nepali: "नरैनापुर" },
  { roman: "Raptisonari", nepali: "राप्तीसोनारीी" },
  { roman: "Baijanath", nepali: "बैजनाथ" },
  { roman: "Khajura", nepali: "खजुरा" },
  { roman: "Duduwa", nepali: "डुडुवाा" },
  { roman: "Janaki", nepali: "जानकी" },
  { roman: "Gulariya", nepali: "गुलरिया" },
  { roman: "Madhuban", nepali: "मधुवन" },
  { roman: "Rajapur", nepali: "राजापुर" },
  { roman: "Thakurbaba", nepali: "ठाकुरबाबा" },
  { roman: "Bansgadhi", nepali: "बाँसगढी" },
  { roman: "Barbardiya", nepali: "बारबर्दिया" },
  { roman: "Badhaiyatal", nepali: "बढैयाताल" },
  { roman: "Geruwa", nepali: "गेरुवा" },
  { roman: "Tulsipur", nepali: "तुल्सीपुर" },
  { roman: "Ghorahi", nepali: "घोराही" },
  { roman: "Lamahi", nepali: "लमही" },
  { roman: "Bangalichuli", nepali: "बंगलाचुली" },
  { roman: "Dangisaran", nepali: "दंगीशरण" },
  { roman: "Gadhawa", nepali: "गढवा" },
  { roman: "Rajpur", nepali: "राजपुर" },
  { roman: "Rapti", nepali: "राप्ती" },
  { roman: "Santinagar", nepali: "शान्तिनगर" },
  { roman: "Babai", nepali: "बबई" },
  { roman: "Musikot", nepali: "मुसिकोट" },
  { roman: "Resunga", nepali: "रेसुंगा" },
  { roman: "Ishma", nepali: "इस्मा" },
  { roman: "Kaligandaki", nepali: "कालीगण्डकी" },
  { roman: "Gulmidarbar", nepali: "गुल्मीदरबार" },
  { roman: "Satyawoti", nepali: "सत्यवती" },
  { roman: "Chandrakot", nepali: "चन्द्रकोट" },
  { roman: "Ruru", nepali: "रुरु" },
  { roman: "Chhatrakot", nepali: "छत्रकोट" },
  { roman: "Dhurkot", nepali: "धुर्कोट" },
  { roman: "Madane", nepali: "मदाने" },
  { roman: "Malika", nepali: "मालिका" },
  { roman: "Kapilvastu", nepali: "कपिलवस्तु" },
  { roman: "Buddhabhumi", nepali: "बुद्धभुमी" },
  { roman: "Shivaraj", nepali: "शिवराज" },
  { roman: "Maharajgang", nepali: "महाराजगञ्ज" },
  { roman: "Krishnanagar", nepali: "कृष्णनगर" },
  { roman: "Bandganga", nepali: "बाणगंगा" },
  { roman: "Mayadevi", nepali: "मायादेवी" },
  { roman: "Yesodhara", nepali: "यसोधरा" },
  { roman: "Bijayanagar", nepali: "विजयनगर" },
  { roman: "Suddhodhan", nepali: "शुद्धोधन" },
  { roman: "Sarawal", nepali: "सरावल" },
  { roman: "Ramgram", nepali: "रामग्राम" },
  { roman: "Sunwal", nepali: "सुनवल" },
  { roman: "Tribenisusta", nepali: "ट्रिबेनिसुस्ता" },
  { roman: "Palhinandan", nepali: "पाल्हीनन्दन" },
  { roman: "Pratappur", nepali: "प्रतापपुर" },
  { roman: "Bardghat", nepali: "बर्दघाट" },
  { roman: "Rampur", nepali: "रामपुर" },
  { roman: "Tansen", nepali: "तानसेन" },
  { roman: "Nisdi", nepali: "निस्दी" },
  { roman: "Purbakhola", nepali: "पूर्वखोला" },
  { roman: "Rambha", nepali: "रम्भा" },
  { roman: "Mathagadi", nepali: "माथागढी" },
  { roman: "Tinau", nepali: "तिनाउ" },
  { roman: "Baganaskali", nepali: "बगनासकाली" },
  { roman: "Ribdikot", nepali: "रिब्दीकोट" },
  { roman: "Rainadevi Chhahara", nepali: "रैनादेवी छहरा" },
  { roman: "Rolpa", nepali: "रोल्पा" },
  { roman: "Tribeni", nepali: "त्रिवेणी" },
  { roman: "Duikholi", nepali: "दुईखोली" },
  { roman: "Madi", nepali: "माडी" },
  { roman: "Runtigadhi", nepali: "रुन्टीगढी" },
  { roman: "Lungri", nepali: "लुङग्री" },
  { roman: "Sukidaha", nepali: "सुकिदह" },
  { roman: "Sunchhahari", nepali: "सुनछहरी" },
  { roman: "Subarnawoti", nepali: "सुवर्णवती" },
  { roman: "Thabang", nepali: "थबाङ" },
  { roman: "Putha Uttarganga", nepali: "पुथा उत्तरगंगा" },
  { roman: "Bhume", nepali: "भूमे" },
  { roman: "Sisne", nepali: "सिस्ने" },
  { roman: "Butwal", nepali: "बुटवल" },
  { roman: "Lumbini Saskritik", nepali: "लुम्बिनी सांस्कृतिक" },
  { roman: "Sidharthanager", nepali: "सिद्धार्थनगर" },
  { roman: "Sammarimai", nepali: "सम्मरीमाई" },
  { roman: "Debdaha", nepali: "देवदह" },
  { roman: "Sainamaina", nepali: "सैनामैना" },
  { roman: "Tilottma", nepali: "तिलोत्तमा" },
  { roman: "Siyari", nepali: "सियारी" },
  { roman: "Gaidahawa", nepali: "गैडहवा" },
  { roman: "Kanchan", nepali: "कन्चन" },
  { roman: "Kotahimai", nepali: "कोटहीमाई" },
  { roman: "Marchawari", nepali: "मर्चवारी" },
  { roman: "Mayadevi", nepali: "मायादेवी" },
  { roman: "Omsatiya", nepali: "ओमसतिया" },
  { roman: "Rohindi", nepali: "रोहिणी" },
  { roman: "Suddodhan", nepali: "शुद्धोधन" },
  { roman: "Narayan", nepali: "नारायण" },
  { roman: "Dullu", nepali: "दुल्लु" },
  { roman: "Chamunda Bindrasaini", nepali: "चामुण्डा बिन्द्रासैनी" },
  { roman: "Aathbis", nepali: "आठबीस" },
  { roman: "Bhagawatimai", nepali: "भगवतीमाई" },
  { roman: "Gurash", nepali: "गुराँस" },
  { roman: "Dungeshwar", nepali: "डुंगेश्वर" },
  { roman: "Naumule", nepali: "नौमुले" },
  { roman: "Mahabu", nepali: "महाबु" },
  { roman: "Bhairabi", nepali: "भैरवी" },
  { roman: "Thatikadh", nepali: "ठाँटीकाँध" },
  { roman: "Thuli veri", nepali: "ठूलीभेरी" },
  { roman: "Tripurasundari", nepali: "त्रिपुरासुन्दरी" },
  { roman: "Dolpa buddha", nepali: "डोल्पा बुद्ध" },
  { roman: "She phoksundo", nepali: "शे फोक्सुन्डो" },
  { roman: "Jagdulla", nepali: "जगदुल्ला" },
  { roman: "Mudkechula", nepali: "मुड्केचुला" },
  { roman: "Kaike", nepali: "काइके" },
  { roman: "Chharka tangsong", nepali: "छार्का ताङसोङ" },
  { roman: "Simkot", nepali: "सिमकोट" },
  { roman: "Namkha", nepali: "नाम्खा" },
  { roman: "kharpunath", nepali: "खार्पुनाथ" },
  { roman: "Surkegad", nepali: "सर्केगाड" },
  { roman: "Chankheli", nepali: "चंखेली" },
  { roman: "Adanchuli", nepali: "अदानचुली" },
  { roman: "Tajakot", nepali: "ताँजाकोट" },
  { roman: "Veri", nepali: "भेरी" },
  { roman: "Chhedagad", nepali: "छेडागाड" },
  { roman: "Tribeni nalgad", nepali: "त्रिवेणी नलगाड" },
  { roman: "Kuse", nepali: "कुसे" },
  { roman: "Junichande", nepali: "जुनीचाँदे" },
  { roman: "Barekot", nepali: "बारेकोट" },
  { roman: "Shibalaya", nepali: "शिवालय" },
  { roman: "Chandannath", nepali: "चन्दननाथ" },
  { roman: "Kankasundari", nepali: "कनकासुन्दरी" },
  { roman: "Sinja", nepali: "सिंजा" },
  { roman: "Hima", nepali: "हिमा" },
  { roman: "Tila", nepali: "तिला" },
  { roman: "Guthichaur", nepali: "गुठीचौर" },
  { roman: "Tatopani", nepali: "तातोपानी" },
  { roman: "Patarasi", nepali: "पातारासी" },
  { roman: "Khadachakra", nepali: "खाँडाचक्र" },
  { roman: "Raskot", nepali: "रास्कोट" },
  { roman: "Tilagupha", nepali: "तिलागुफा" },
  { roman: "Pachaljharana", nepali: "पाचलझरना" },
  { roman: "Sanni tribeni", nepali: "सान्नी त्रिवेणी" },
  { roman: "Naraharinath", nepali: "नरहरीनाथ" },
  { roman: "Kalika", nepali: "कालिका" },
  { roman: "Mahabai", nepali: "महावै" },
  { roman: "Palata", nepali: "पलाता" },
  { roman: "Musikot", nepali: "मुसिकोट" },
  { roman: "Chaurjahari", nepali: "चौरजहारी" },
  { roman: "Aathabiskot", nepali: "आठबिसकोट" },
  { roman: "Baphikot", nepali: "बाँफिकोट" },
  { roman: "Tribeni", nepali: "त्रिवेणी" },
  { roman: "Sanibheri", nepali: "सानीभेरी" },
  { roman: "Sarada", nepali: "शारदा" },
  { roman: "Bagchaur", nepali: "बागचौर" },
  { roman: "Bangad", nepali: "बनगाँड" },
  { roman: "Kalimati", nepali: "कालिमाटी" },
  { roman: "Tribeni", nepali: "त्रिवेणी" },
  { roman: "Kapurkot", nepali: "कपुरकोट" },
  { roman: "Chhatreswori", nepali: "छत्रेश्वरी" },
  { roman: "Dhorchaur", nepali: "ढोरचौर" },
  { roman: "Kumakhamalika", nepali: "कुमाखमालिका" },
  { roman: "Darma", nepali: "दार्मा" },
  { roman: "Birendra", nepali: "बीरेन्द्र" },
  { roman: "Bheriganga", nepali: "भेरीगंगा" },
  { roman: "Gurbhakot", nepali: "गुर्भाकोट" },
  { roman: "Pabchapuri", nepali: "पञ्चपुरी" },
  { roman: "Lekbesi", nepali: "लेकबेसी" },
  { roman: "Chaukune", nepali: "चौकुने" },
  { roman: "Barahatal", nepali: "बराहताल" },
  { roman: "Chingad", nepali: "चिङ्गाड" },
  { roman: "Simta", nepali: "सिम्ता" },
  { roman: "Mangalsen", nepali: "मंगलसेन" },
  { roman: "Kamalbajar", nepali: "कमलबजार" },
  { roman: "Sanphebagar", nepali: "साँफेवगर" },
  { roman: "Panchadewal Binayak", nepali: "पंचदेवल विनायक" },
  { roman: "Chaurpati", nepali: "चौरपाटी" },
  { roman: "Mellekh", nepali: "मेल्लेख" },
  { roman: "Bannigadi Jayagadh", nepali: "बान्नीगढी जयगढ" },
  { roman: "Ramaroshan", nepali: "रामारोशन" },
  { roman: "Dhakari", nepali: "ढकारी" },
  { roman: "Turmakhad", nepali: "तुर्माखाँद" },
  { roman: "Dashrathachanda", nepali: "दशरथचन्द" },
  { roman: "Patan", nepali: "पाटन" },
  { roman: "Melauli", nepali: "मेलौली" },
  { roman: "Purchaudi", nepali: "पुर्चौडी" },
  { roman: "Surnaya", nepali: "सुर्नया" },
  { roman: "Sisag", nepali: "सिगास" },
  { roman: "Shivanath", nepali: "शिवनाथ" },
  { roman: "Pancheshwar", nepali: "पंचेश्वर" },
  { roman: "Dogdakedar", nepali: "दोगडाकेदार" },
  { roman: "Dilasaini", nepali: "डीलासैनी" },
  { roman: "jayaprithvi", nepali: "जयपृथ्वी" },
  { roman: "Bungal", nepali: "बुंगल" },
  { roman: "Talkot", nepali: "तालकोट" },
  { roman: "Masta", nepali: "मष्टा" },
  { roman: "Khaptadchhanna", nepali: "खप्तडछान्ना" },
  { roman: "Thalara", nepali: "थलारा" },
  { roman: "Bitthadchir", nepali: "वित्थडचिर" },
  { roman: "Surma", nepali: "सूर्मा" },
  { roman: "Chhabispathibhera", nepali: "छबिसपाथिभेरा" },
  { roman: "Durgathali", nepali: "दुर्गाथली" },
  { roman: "Kedarsyun", nepali: "केदारस्युँ" },
  { roman: "Kanda", nepali: "काण्ड" },
  { roman: "Badimalika", nepali: "बडिमालिका" },
  { roman: "Tribeni", nepali: "त्रिवेणी" },
  { roman: "Budhiganga", nepali: "बुढीगंगा" },
  { roman: "Budhinanda", nepali: "बुढीनन्दा" },
  { roman: "Gaumun", nepali: "गौमुल" },
  { roman: "Pandav", nepali: "पाण्डव" },
  { roman: "Swamikartik", nepali: "स्वामीकार्तिक" },
  { roman: "Chhededaha", nepali: "छेडेदह" },
  { roman: "Himali", nepali: "हिमाली" },
  { roman: "Amargadhi", nepali: "अमरगढी" },
  { roman: "Parsuram", nepali: "परशुराम" },
  { roman: "Aalital", nepali: "आलिताल" },
  { roman: "Bhageshwar", nepali: "भागेश्वर" },
  { roman: "nabadurga", nepali: "नवदुर्गा" },
  { roman: "Ajayameru", nepali: "अजयमेरु" },
  { roman: "Ganyapdhura", nepali: "गन्यापधुरा" },
  { roman: "Mahakali", nepali: "महाकाली" },
  { roman: "Shailyashikar", nepali: "शैल्यशिखर" },
  { roman: "Malikarjun", nepali: "मालिकार्जुन" },
  { roman: "Apihimal", nepali: "अपिहिमाल" },
  { roman: "Duhu", nepali: "दुहुँ" },
  { roman: "Naugad", nepali: "नौगाड" },
  { roman: "Marma", nepali: "मार्मा" },
  { roman: "Lekam", nepali: "लेकम" },
  { roman: "Byash", nepali: "व्याँस" },
  { roman: "Dipayal siladhi", nepali: "दिपायल सिलगढी" },
  { roman: "Shikhar", nepali: "शिखर" },
  { roman: "Purbichauki", nepali: "पूर्वीचौकी" },
  { roman: "Badikedar", nepali: "बडीकेदार" },
  { roman: "Jorayal", nepali: "जोरायल" },
  { roman: "Sayal", nepali: "सायल" },
  { roman: "Aadarsh", nepali: "आदर्श" },
  { roman: "K.I.Singh", nepali: "के.आई.सिंह" },
  { roman: "Bogatan", nepali: "बोगाटन" },
  { roman: "Dhangadhi", nepali: "धनगढी" },
  { roman: "Tikapur", nepali: "टिकापुर" },
  { roman: "Ghodaghodi", nepali: "घोडाघोडी" },
  { roman: "Lamkichuha", nepali: "लम्किचुहा" },
  { roman: "bhajani", nepali: "भजनी" },
  { roman: "Godawari", nepali: "गोदावरी" },
  { roman: "Gauriganga", nepali: "गौरीगंगा" },
  { roman: "Janaki", nepali: "जानकी" },
  { roman: "Bardagoriya", nepali: "बर्दगोरिया" },
  { roman: "Mohanyal", nepali: "मोहन्याल" },
  { roman: "Kailari", nepali: "कैलारी" },
  { roman: "Joshipur", nepali: "जोशीपुर" },
  { roman: "Chure", nepali: "चुरे" },
  { roman: "bhimdatta", nepali: "भिमदत्त" },
  { roman: "Punarbas", nepali: "पुनर्वास" },
  { roman: "Bedkot", nepali: "बेदकोट" },
  { roman: "Mahakali", nepali: "महाकाली" },
  { roman: "Shuklaphata", nepali: "शुक्लाफाँट" },
  { roman: "Belauri", nepali: "बेलौरी" },
  { roman: "Krishnapur", nepali: "कृष्णपुर" },
  { roman: "Beldandi", nepali: "बेलडाँडी" },
  { roman: "Laljhadi", nepali: "लालझाडी" },
  { roman: "k", nepali: "क्" },
  { roman: "kh", nepali: "ख्" },
  { roman: "g", nepali: "ग्" },
  { roman: "gh", nepali: "घ्" },
  { roman: "n", nepali: "ङ्" },
  { roman: "ch", nepali: "च्" },
  { roman: "chh", nepali: "छ्" },
  { roman: "j", nepali: "ज्" },
  { roman: "jh", nepali: "झ्" },
  { roman: "n", nepali: "ञ्" },
  { roman: "t", nepali: "ट्" },
  { roman: "th", nepali: "ठ्" },
  { roman: "d", nepali: "ड्" },
  { roman: "dh", nepali: "ढ्" },
  { roman: "n", nepali: "ण्" },
  { roman: "t", nepali: "त्" },
  { roman: "th", nepali: "थ्" },
  { roman: "d", nepali: "द्" },
  { roman: "dh", nepali: "ध्" },
  { roman: "n", nepali: "न्" },
  { roman: "p", nepali: "प्" },
  { roman: "ph", nepali: "फ्" },
  { roman: "b", nepali: "ब्" },
  { roman: "bh", nepali: "भ्" },
  { roman: "m", nepali: "म्" },
  { roman: "y", nepali: "य्" },
  { roman: "r", nepali: "र्" },
  { roman: "l", nepali: "ल्" },
  { roman: "w", nepali: "व्" },
  { roman: "s", nepali: "श्" },
  { roman: "s", nepali: "ष्" },
  { roman: "s", nepali: "स्" },
  { roman: "h", nepali: "ह्" },
  { roman: "श", nepali: "ष" },
  { roman: "ka", nepali: "का" },
  { roman: "ko", nepali: "को" },
  { roman: "kau", nepali: "कौ" },
  { roman: "ki", nepali: "कि" },
  { roman: "ki", nepali: "की" },
  { roman: "ku", nepali: "कु" },
  { roman: "ku", nepali: "कू" },
  { roman: "ke", nepali: "के" },
  { roman: "kai", nepali: "कै" },
  { roman: "kum", nepali: "कं" },
  { roman: "kha", nepali: "खा" },
  { roman: "kho", nepali: "खो" },
  { roman: "khau", nepali: "खौ" },
  { roman: "khi", nepali: "खि" },
  { roman: "khi", nepali: "खी" },
  { roman: "khu", nepali: "खु" },
  { roman: "khu", nepali: "खू" },
  { roman: "khe", nepali: "खे" },
  { roman: "khai", nepali: "खै" },
  { roman: "khum", nepali: "खं" },
  { roman: "ga", nepali: "गा" },
  { roman: "go", nepali: "गो" },
  { roman: "gau", nepali: "गौ" },
  { roman: "gi", nepali: "गि" },
  { roman: "gi", nepali: "गी" },
  { roman: "gu", nepali: "गु" },
  { roman: "gu", nepali: "गू" },
  { roman: "ge", nepali: "गे" },
  { roman: "gai", nepali: "गै" },
  { roman: "gum", nepali: "गं" },
  { roman: "gha", nepali: "घा" },
  { roman: "gho", nepali: "घो" },
  { roman: "ghau", nepali: "घौ" },
  { roman: "ghi", nepali: "घि" },
  { roman: "ghi", nepali: "घी" },
  { roman: "ghu", nepali: "घु" },
  { roman: "ghu", nepali: "घू" },
  { roman: "ghe", nepali: "घे" },
  { roman: "ghai", nepali: "घै" },
  { roman: "ghum", nepali: "घं" },
  { roman: "na", nepali: "ङा" },
  { roman: "no", nepali: "ङो" },
  { roman: "nau", nepali: "ङौ" },
  { roman: "ni", nepali: "ङि" },
  { roman: "ni", nepali: "ङी" },
  { roman: "nu", nepali: "ङु" },
  { roman: "nu", nepali: "ङू" },
  { roman: "ne", nepali: "ङे" },
  { roman: "nai", nepali: "ङै" },
  { roman: "num", nepali: "ङं" },
  { roman: "cha", nepali: "चा" },
  { roman: "cho", nepali: "चो" },
  { roman: "chau", nepali: "चौ" },
  { roman: "chi", nepali: "चि" },
  { roman: "chi", nepali: "ची" },
  { roman: "chu", nepali: "चु" },
  { roman: "chu", nepali: "चू" },
  { roman: "che", nepali: "चे" },
  { roman: "chai", nepali: "चै" },
  { roman: "chum", nepali: "चं" },
  { roman: "chha", nepali: "छा" },
  { roman: "chho", nepali: "छो" },
  { roman: "chhau", nepali: "छौ" },
  { roman: "chhi", nepali: "छि" },
  { roman: "chhi", nepali: "छी" },
  { roman: "chhu", nepali: "छु" },
  { roman: "chhu", nepali: "छू" },
  { roman: "chhe", nepali: "छे" },
  { roman: "chhai", nepali: "छै" },
  { roman: "chhum", nepali: "छं" },
  { roman: "ja", nepali: "जा" },
  { roman: "jo", nepali: "जो" },
  { roman: "jau", nepali: "जौ" },
  { roman: "ji", nepali: "जि" },
  { roman: "ji", nepali: "जी" },
  { roman: "ju", nepali: "जु" },
  { roman: "ju", nepali: "जू" },
  { roman: "je", nepali: "जे" },
  { roman: "jai", nepali: "जै" },
  { roman: "jum", nepali: "जं" },
  { roman: "jha", nepali: "झा" },
  { roman: "jho", nepali: "झो" },
  { roman: "jhau", nepali: "झौ" },
  { roman: "jhi", nepali: "झि" },
  { roman: "jhi", nepali: "झी" },
  { roman: "jhu", nepali: "झु" },
  { roman: "jhu", nepali: "झू" },
  { roman: "jhe", nepali: "झे" },
  { roman: "jhai", nepali: "झै" },
  { roman: "jhum", nepali: "झं" },
  { roman: "na", nepali: "ञा" },
  { roman: "no", nepali: "ञो" },
  { roman: "nau", nepali: "ञौ" },
  { roman: "ni", nepali: "ञि" },
  { roman: "ni", nepali: "ञी" },
  { roman: "nu", nepali: "ञु" },
  { roman: "nu", nepali: "ञू" },
  { roman: "ne", nepali: "ञे" },
  { roman: "nai", nepali: "ञै" },
  { roman: "num", nepali: "ञं" },
  { roman: "ta", nepali: "टा" },
  { roman: "to", nepali: "टो" },
  { roman: "tau", nepali: "टौ" },
  { roman: "ti", nepali: "टि" },
  { roman: "ti", nepali: "टी" },
  { roman: "tu", nepali: "टु" },
  { roman: "tu", nepali: "टू" },
  { roman: "te", nepali: "टे" },
  { roman: "tai", nepali: "टै" },
  { roman: "tum", nepali: "टं" },
  { roman: "tha", nepali: "ठा" },
  { roman: "tho", nepali: "ठो" },
  { roman: "thau", nepali: "ठौ" },
  { roman: "thi", nepali: "ठि" },
  { roman: "thi", nepali: "ठी" },
  { roman: "thu", nepali: "ठु" },
  { roman: "thu", nepali: "ठू" },
  { roman: "the", nepali: "ठे" },
  { roman: "thai", nepali: "ठै" },
  { roman: "thum", nepali: "ठं" },
  { roman: "da", nepali: "डा" },
  { roman: "do", nepali: "डो" },
  { roman: "dau", nepali: "डौ" },
  { roman: "di", nepali: "डि" },
  { roman: "di", nepali: "डी" },
  { roman: "du", nepali: "डु" },
  { roman: "du", nepali: "डू" },
  { roman: "de", nepali: "डे" },
  { roman: "dai", nepali: "डै" },
  { roman: "dum", nepali: "डं" },
  { roman: "dha", nepali: "ढा" },
  { roman: "dho", nepali: "ढो" },
  { roman: "dha", nepali: "ढौ" },
  { roman: "dhi", nepali: "ढि" },
  { roman: "dhi", nepali: "ढी" },
  { roman: "dhu", nepali: "ढु" },
  { roman: "dhu", nepali: "ढू" },
  { roman: "dhe", nepali: "ढे" },
  { roman: "dhai", nepali: "ढै" },
  { roman: "dhum", nepali: "ढं" },
  { roman: "ta", nepali: "ता" },
  { roman: "to", nepali: "तो" },
  { roman: "tau", nepali: "तौ" },
  { roman: "ti", nepali: "ति" },
  { roman: "ti", nepali: "ती" },
  { roman: "tu", nepali: "तु" },
  { roman: "tu", nepali: "तू" },
  { roman: "te", nepali: "ते" },
  { roman: "tai", nepali: "तै" },
  { roman: "tum", nepali: "तं" },
  { roman: "tha", nepali: "था" },
  { roman: "tho", nepali: "थो" },
  { roman: "thau", nepali: "थौ" },
  { roman: "thi", nepali: "थि" },
  { roman: "thi", nepali: "थी" },
  { roman: "thu", nepali: "थु" },
  { roman: "thu", nepali: "थू" },
  { roman: "the", nepali: "थे" },
  { roman: "thai", nepali: "थै" },
  { roman: "thum", nepali: "थं" },
  { roman: "da", nepali: "दा" },
  { roman: "do", nepali: "दो" },
  { roman: "dau", nepali: "दौ" },
  { roman: "di", nepali: "दि" },
  { roman: "di", nepali: "दी" },
  { roman: "du", nepali: "दु" },
  { roman: "du", nepali: "दू" },
  { roman: "de", nepali: "दे" },
  { roman: "dai", nepali: "दै" },
  { roman: "dum", nepali: "दं" },
  { roman: "dha", nepali: "धा" },
  { roman: "dho", nepali: "धो" },
  { roman: "dhau", nepali: "धौ" },
  { roman: "dhi", nepali: "धि" },
  { roman: "dhi", nepali: "धी" },
  { roman: "dhu", nepali: "धु" },
  { roman: "dhu", nepali: "धू" },
  { roman: "dhe", nepali: "धे" },
  { roman: "dhai", nepali: "धै" },
  { roman: "dhum", nepali: "धं" },
  { roman: "na", nepali: "ना" },
  { roman: "no", nepali: "नो" },
  { roman: "nau", nepali: "नौ" },
  { roman: "ni", nepali: "नि" },
  { roman: "ni", nepali: "नी" },
  { roman: "nu", nepali: "नु" },
  { roman: "nu", nepali: "नू" },
  { roman: "ne", nepali: "ने" },
  { roman: "nai", nepali: "नै" },
  { roman: "num", nepali: "नं" },
  { roman: "pa", nepali: "पा" },
  { roman: "po", nepali: "पो" },
  { roman: "pau", nepali: "पौ" },
  { roman: "pi", nepali: "पि" },
  { roman: "pi", nepali: "पी" },
  { roman: "pu", nepali: "पु" },
  { roman: "pu", nepali: "पू" },
  { roman: "pe", nepali: "पे" },
  { roman: "pai", nepali: "पै" },
  { roman: "pum", nepali: "पं" },
  { roman: "pha", nepali: "फा" },
  { roman: "pho", nepali: "फो" },
  { roman: "phau", nepali: "फौ" },
  { roman: "phi", nepali: "फि" },
  { roman: "phi", nepali: "फी" },
  { roman: "phu", nepali: "फु" },
  { roman: "phu", nepali: "फू" },
  { roman: "phe", nepali: "फे" },
  { roman: "phai", nepali: "फै" },
  { roman: "phum", nepali: "फं" },
  { roman: "ba", nepali: "बा" },
  { roman: "bo", nepali: "बो" },
  { roman: "bau", nepali: "बौ" },
  { roman: "bi", nepali: "बि" },
  { roman: "bi", nepali: "बी" },
  { roman: "bu", nepali: "बु" },
  { roman: "bu", nepali: "बू" },
  { roman: "be", nepali: "बे" },
  { roman: "bai", nepali: "बै" },
  { roman: "bum", nepali: "बं" },
  { roman: "bha", nepali: "भा" },
  { roman: "bho", nepali: "भो" },
  { roman: "bhau", nepali: "भौ" },
  { roman: "bhi", nepali: "भि" },
  { roman: "bhi", nepali: "भी" },
  { roman: "bhu", nepali: "भु" },
  { roman: "bhu", nepali: "भू" },
  { roman: "bhe", nepali: "भे" },
  { roman: "bhai", nepali: "भै" },
  { roman: "bhum", nepali: "भं" },
  { roman: "ma", nepali: "मा" },
  { roman: "mo", nepali: "मो" },
  { roman: "mau", nepali: "मौ" },
  { roman: "mi", nepali: "मि" },
  { roman: "mi", nepali: "मी" },
  { roman: "mu", nepali: "मु" },
  { roman: "mu", nepali: "मू" },
  { roman: "me", nepali: "मे" },
  { roman: "mai", nepali: "मै" },
  { roman: "mum", nepali: "मं" },
  { roman: "ya", nepali: "या" },
  { roman: "yo", nepali: "यो" },
  { roman: "yau", nepali: "यौ" },
  { roman: "yi", nepali: "यि" },
  { roman: "yi", nepali: "यी" },
  { roman: "yu", nepali: "यु" },
  { roman: "yu", nepali: "यू" },
  { roman: "ye", nepali: "ये" },
  { roman: "yai", nepali: "यै" },
  { roman: "yum", nepali: "यं" },
  { roman: "ra", nepali: "रा" },
  { roman: "ro", nepali: "रो" },
  { roman: "rau", nepali: "रौ" },
  { roman: "ri", nepali: "रि" },
  { roman: "ri", nepali: "री" },
  { roman: "ru", nepali: "रु" },
  { roman: "ru", nepali: "रू" },
  { roman: "re", nepali: "रे" },
  { roman: "rai", nepali: "रै" },
  { roman: "rum", nepali: "रं" },
  { roman: "la", nepali: "ला" },
  { roman: "lo", nepali: "लो" },
  { roman: "lau", nepali: "लौ" },
  { roman: "li", nepali: "लि" },
  { roman: "li", nepali: "ली" },
  { roman: "lu", nepali: "लु" },
  { roman: "lu", nepali: "लू" },
  { roman: "le", nepali: "ले" },
  { roman: "lai", nepali: "लै" },
  { roman: "lum", nepali: "लं" },
  { roman: "wa", nepali: "वा" },
  { roman: "wo", nepali: "वो" },
  { roman: "wau", nepali: "वौ" },
  { roman: "wi", nepali: "वि" },
  { roman: "wi", nepali: "वी" },
  { roman: "wu", nepali: "वु" },
  { roman: "wu", nepali: "वू" },
  { roman: "we", nepali: "वे" },
  { roman: "wai", nepali: "वै" },
  { roman: "wum", nepali: "वं" },
  { roman: "sha", nepali: "शा" },
  { roman: "sho", nepali: "शो" },
  { roman: "shau", nepali: "शौ" },
  { roman: "shi", nepali: "शि" },
  { roman: "shi", nepali: "शी" },
  { roman: "shu", nepali: "शु" },
  { roman: "shu", nepali: "शू" },
  { roman: "she", nepali: "शे" },
  { roman: "shai", nepali: "शै" },
  { roman: "shum", nepali: "शं" },
  { roman: "ha", nepali: "हा" },
  { roman: "ho", nepali: "हो" },
  { roman: "hau", nepali: "हौ" },
  { roman: "hi", nepali: "हि" },
  { roman: "hi", nepali: "ही" },
  { roman: "hu", nepali: "हु" },
  { roman: "hu", nepali: "हू" },
  { roman: "he", nepali: "हे" },
  { roman: "hai", nepali: "है" },
  { roman: "hum", nepali: "हं" },
  { roman: "ka", nepali: "क" },
  { roman: "kha", nepali: "ख" },
  { roman: "ga", nepali: "ग" },
  { roman: "gha", nepali: "घ" },
  { roman: "na", nepali: "ङ" },
  { roman: "cha", nepali: "च" },
  { roman: "chha", nepali: "छ" },
  { roman: "ja", nepali: "ज" },
  { roman: "jha", nepali: "झ" },
  { roman: "na", nepali: "ञ" },
  { roman: "ta", nepali: "ट" },
  { roman: "tha", nepali: "ठ" },
  { roman: "da", nepali: "ड" },
  { roman: "dha", nepali: "ढ" },
  { roman: "na", nepali: "ण" },
  { roman: "ta", nepali: "त" },
  { roman: "tha", nepali: "थ" },
  { roman: "da", nepali: "द" },
  { roman: "dha", nepali: "ध" },
  { roman: "na", nepali: "न" },
  { roman: "pa", nepali: "प" },
  { roman: "pha", nepali: "फ" },
  { roman: "ba", nepali: "ब" },
  { roman: "bha", nepali: "भ" },
  { roman: "ma", nepali: "म" },
  { roman: "ya", nepali: "य" },
  { roman: "ra", nepali: "र" },
  { roman: "la", nepali: "ल" },
  { roman: "wa", nepali: "व" },
  { roman: "sa", nepali: "स" },
  { roman: "sha", nepali: "श" },
  { roman: "श", nepali: "ष" },
  { roman: "ha", nepali: "ह" },
  { roman: "n", nepali: "ँ" },
  { roman: "m", nepali: "ं" },
  { roman: "h", nepali: "ः" },
  { roman: "a", nepali: "अ" },
  { roman: "aa", nepali: "आ" },
  { roman: "i", nepali: "इ" },
  { roman: "i", nepali: "ई" },
  { roman: "u", nepali: "उ" },
  { roman: "u", nepali: "ऊ" },
  { roman: "ri", nepali: "ऋ" },
  { roman: "e", nepali: "ए" },
  { roman: "ai", nepali: "ऐ" },
  { roman: "o", nepali: "ओ" },
  { roman: "au", nepali: "औ" },
  { roman: "i", nepali: "ि" },
  { roman: "i", nepali: "ी" },
  { roman: "u", nepali: "ु" },
  { roman: "u", nepali: "ू" },
  { roman: "ri", nepali: "ृ" },
  { roman: "e", nepali: "े" },
  { roman: "ai", nepali: "ै" },
  { roman: "o", nepali: "ो" },
  { roman: "au", nepali: "ौ" },
  { roman: "0", nepali: "०" },
  { roman: "1", nepali: "१" },
  { roman: "2", nepali: "२" },
  { roman: "3", nepali: "३" },
  { roman: "4", nepali: "४" },
  { roman: "5", nepali: "५" },
  { roman: "6", nepali: "६" },
  { roman: "7", nepali: "७" },
  { roman: "8", nepali: "८" },
  { roman: "9", nepali: "९" }
  // Note: dot '.' is NOT mapped - it's used for nukta sequences (kh., gh., .r, .l)
  // Use | (pipe) for danda instead
];
const buildMapping$1 = (entries) => {
  const sensitive = [];
  const insensitive = [];
  for (const entry of entries) {
    for (const key of entry.keys) {
      if (!key) continue;
      if (entry.caseSensitive) {
        sensitive.push({ key, value: entry.value });
      } else {
        insensitive.push({ key: key.toLowerCase(), value: entry.value });
      }
    }
  }
  sensitive.sort((a, b) => b.key.length - a.key.length);
  insensitive.sort((a, b) => b.key.length - a.key.length);
  return { sensitive, insensitive };
};
const matchFromMapping = (source, lowerSource, index, mapping) => {
  for (const candidate of mapping.sensitive) {
    if (source.startsWith(candidate.key, index)) {
      return {
        config: candidate.value,
        raw: source.slice(index, index + candidate.key.length),
        key: candidate.key
      };
    }
  }
  for (const candidate of mapping.insensitive) {
    if (lowerSource.startsWith(candidate.key, index)) {
      return {
        config: candidate.value,
        raw: source.slice(index, index + candidate.key.length),
        key: candidate.key
      };
    }
  }
  return null;
};
const HALANT$1 = "्";
const DEFAULT_HALANT_TRIGGERS = ["^"];
const normalizeLexicalKey = (value) => value.toLowerCase().replace(/[^a-z]/g, "");
const shouldIndexLexiconEntry = (roman) => {
  const trimmed = roman.trim();
  if (trimmed.length >= 5) return true;
  if (/[A-Z]/.test(trimmed)) return true;
  if (/[\s\-\.\u2013\u2014'’]/.test(trimmed)) return true;
  return false;
};
const lexicalWordMap = /* @__PURE__ */ new Map();
for (const entry of LEXICON_ENTRIES) {
  if (!shouldIndexLexiconEntry(entry.roman)) continue;
  const key = normalizeLexicalKey(entry.roman);
  if (!key || lexicalWordMap.has(key)) continue;
  lexicalWordMap.set(key, entry.nepali);
}
const digitMap$1 = {
  "0": "०",
  "1": "१",
  "2": "२",
  "3": "३",
  "4": "४",
  "5": "५",
  "6": "६",
  "7": "७",
  "8": "८",
  "9": "९"
};
const vowelMapping = buildMapping$1([
  { keys: ["aa", "a:"], value: { independent: "आ", matra: "ा" } },
  { keys: ["a"], value: { independent: "अ", matra: "", inherent: true } },
  { keys: ["ai"], value: { independent: "ऐ", matra: "ै" } },
  { keys: ["au"], value: { independent: "औ", matra: "ौ" } },
  { keys: ["ee", "ii"], value: { independent: "ई", matra: "ी" } },
  { keys: ["ei", "e"], value: { independent: "ए", matra: "े" } },
  { keys: ["oo", "uu"], value: { independent: "ऊ", matra: "ू" } },
  { keys: ["oi", "o"], value: { independent: "ओ", matra: "ो" } },
  { keys: ["ri"], value: { independent: "ऋ", matra: "ृ" } },
  { keys: ["rri"], value: { independent: "ॠ", matra: "ॄ" } },
  { keys: ["R"], value: { independent: "ॠ", matra: "ॄ" }, caseSensitive: true },
  { keys: ["lri"], value: { independent: "ऌ", matra: "ॢ" } },
  { keys: ["lree"], value: { independent: "ॡ", matra: "ॣ" } },
  { keys: ["L"], value: { independent: "ॡ", matra: "ॣ" }, caseSensitive: true },
  { keys: ["e^", "eN"], value: { independent: "ऍ", matra: "ॅ" } },
  // Dravidian short vowels
  { keys: ["e."], value: { independent: "ऎ", matra: "ॆ" } },
  { keys: ["o."], value: { independent: "ऒ", matra: "ॊ" } },
  // Candra o (for English loanwords like "coffee" -> कॉफ़ी)
  { keys: ["aw", "o^"], value: { independent: "ऑ", matra: "ॉ" } },
  // Marathi special vowels
  { keys: [".a"], value: { independent: "ॲ", matra: "" } },
  { keys: ["oe"], value: { independent: "ॳ", matra: "" } },
  { keys: ["ooe"], value: { independent: "ॴ", matra: "" } },
  // Rare dependent vowel signs and archaic matras
  { keys: ["oe~"], value: { independent: "ॳ", matra: "ऺ" } },
  // U+093A - Vowel Sign OE
  { keys: ["ooe~"], value: { independent: "ॴ", matra: "ऻ" } },
  // U+093B - Vowel Sign OOE
  { keys: ["eP"], value: { independent: "ए", matra: "ॎ" } },
  // U+094E - Vowel Sign Prishthamatra E
  { keys: ["awP"], value: { independent: "ऑ", matra: "ॏ" } },
  // U+094F - Vowel Sign Aw
  { keys: ["eL"], value: { independent: "ऍ", matra: "ॕ" } },
  // U+0955 - Vowel Sign Candra Long E
  { keys: ["uL"], value: { independent: "उ", matra: "ॖ" } },
  // U+0956 - Vowel Sign Ue
  { keys: ["uuL"], value: { independent: "ऊ", matra: "ॗ" } },
  // U+0957 - Vowel Sign Uue
  // Kashmiri vowels
  { keys: ["aw."], value: { independent: "ॵ", matra: "" } },
  { keys: ["ue"], value: { independent: "ॶ", matra: "" } },
  { keys: ["uue"], value: { independent: "ॷ", matra: "" } },
  // Additional archaic vowels (U+0904, U+0960, U+0961)
  { keys: ["a4"], value: { independent: "ऄ", matra: "" } },
  // U+0904 - Short A (historical)
  { keys: ["RR"], value: { independent: "ॠ", matra: "ॄ" } },
  // U+0960 - Vocalic RR (alternate)
  { keys: ["LL"], value: { independent: "ॡ", matra: "ॣ" } },
  // U+0961 - Vocalic LL (alternate)
  { keys: ["i"], value: { independent: "इ", matra: "ि" } },
  { keys: ["u"], value: { independent: "उ", matra: "ु" } },
  { keys: ["eei"], value: { independent: "ए", matra: "े" } },
  { keys: ["auu"], value: { independent: "औ", matra: "ौ" } },
  { keys: ["A"], value: { independent: "आ", matra: "ा" }, caseSensitive: true },
  { keys: ["I"], value: { independent: "ई", matra: "ी" }, caseSensitive: true },
  { keys: ["U"], value: { independent: "ऊ", matra: "ू" }, caseSensitive: true },
  { keys: ["E"], value: { independent: "ए", matra: "े" }, caseSensitive: true },
  { keys: ["O"], value: { independent: "ओ", matra: "ो" }, caseSensitive: true }
]);
const consonantMapping = buildMapping$1([
  { keys: ["ksh", "kṣ", "x"], value: "क्ष" },
  { keys: ["gy", "gny", "dny"], value: "ज्ञ" },
  { keys: ["shr", "shra"], value: "श्र" },
  { keys: ["tth"], value: "त्थ" },
  { keys: ["ddh"], value: "द्ध" },
  { keys: ["ntr"], value: "न्त्र" },
  { keys: ["khy"], value: "ख्य" },
  { keys: ["kh"], value: "ख" },
  { keys: ["gh"], value: "घ" },
  { keys: ["chh"], value: "छ" },
  { keys: ["ch"], value: "च" },
  { keys: ["jh"], value: "झ" },
  { keys: ["th"], value: "थ" },
  { keys: ["dh"], value: "ध" },
  { keys: ["ph", "fh"], value: "फ" },
  { keys: ["bh"], value: "भ" },
  { keys: ["sh"], value: "श" },
  { keys: ["ng"], value: "ङ" },
  { keys: ["ny"], value: "ञ" },
  { keys: ["tr"], value: "त्र" },
  { keys: ["qa"], value: "क़" },
  { keys: ["k", "q"], value: "क" },
  { keys: ["g"], value: "ग" },
  { keys: ["c"], value: "क" },
  { keys: ["za"], value: "ज़" },
  { keys: ["j", "z"], value: "ज" },
  { keys: ["fa"], value: "फ़" },
  { keys: ["t"], value: "त" },
  { keys: ["d"], value: "द" },
  { keys: ["n"], value: "न" },
  { keys: ["p"], value: "प" },
  { keys: ["b"], value: "ब" },
  { keys: ["m"], value: "म" },
  { keys: ["y"], value: "य" },
  { keys: ["r"], value: "र" },
  { keys: ["l"], value: "ल" },
  { keys: ["v", "w"], value: "व" },
  { keys: ["sw"], value: "स्व" },
  { keys: ["s"], value: "स" },
  { keys: ["h"], value: "ह" },
  { keys: ["f"], value: "फ" },
  { keys: ["T"], value: "ट", caseSensitive: true },
  { keys: ["Th"], value: "ठ", caseSensitive: true },
  { keys: ["D"], value: "ड", caseSensitive: true },
  { keys: ["Dh"], value: "ढ", caseSensitive: true },
  { keys: ["N"], value: "ण", caseSensitive: true },
  { keys: ["Sh"], value: "ष", caseSensitive: true },
  // Nukta consonants (Urdu/Persian sounds) - Use dot notation to avoid conflicts
  { keys: ["kh."], value: "ख़" },
  // U+0959 - Urdu khe (kh + nukta)
  { keys: ["gh."], value: "ग़" },
  // U+095A - Urdu ghain (gh + nukta)
  { keys: ["D."], value: "ड़" },
  // U+095C - Hindi Ra (flap, D + nukta)
  { keys: ["Dh."], value: "ढ़" },
  // U+095D - Hindi Rha (aspirated flap, Dh + nukta)
  { keys: ["y."], value: "य़" },
  // U+095F - Bengali Ya (y + nukta)
  // Additional nukta variants for complete coverage
  { keys: ["q."], value: "क़" },
  // U+0958 - Urdu qaf
  { keys: ["z."], value: "ज़" },
  // U+095B - Urdu ze
  { keys: ["f."], value: "फ़" },
  // U+095E - Urdu fe
  // Dravidian consonants - Use dot notation
  { keys: [".r"], value: "ऱ" },
  // U+0931 - Tamil/Malayalam ra
  { keys: [".n"], value: "ऩ" },
  // U+0929 - Dravidian na
  { keys: [".l"], value: "ळ" },
  // U+0933 - Marathi/Kannada lla
  { keys: [".zh"], value: "ऴ" },
  // U+0934 - Malayalam/Tamil zha
  // Archaic/historical consonants
  { keys: ["jj"], value: "ज्ज" },
  // Historical archaic letter JJA
  { keys: ["GG"], value: "ॻ" },
  // U+097B - Letter GGA (historical)
  { keys: ["JJ"], value: "ॼ" },
  // U+097C - Letter JA (historical)
  { keys: ["DD"], value: "ॾ" },
  // U+097E - Letter DDDA (historical)
  { keys: ["BH"], value: "ॿ" }
  // U+097F - Letter BBA (historical)
]);
const diacriticMapping = buildMapping$1([
  { keys: ["M"], value: "ं", caseSensitive: true },
  // U+0902 - Anusvara
  { keys: ["H"], value: "ः", caseSensitive: true },
  // U+0903 - Visarga
  { keys: ["~"], value: "ँ" },
  // U+0901 - Candrabindu
  { keys: ["m~", "~m", "m`"], value: "ं" },
  { keys: ["n~", "~n"], value: "ँ" },
  { keys: ["h~", "~h"], value: "ः" },
  { keys: [".a", "'"], value: "ऽ" },
  // U+093D - Avagraha
  { keys: ["om"], value: "ॐ" },
  // U+0950 - Om
  { keys: ["A~"], value: "ऀ" },
  // U+0900 - Sign Inverted Candrabindu (Kashmiri)
  { keys: ["H."], value: "ᳲ" },
  // U+1CF2 - Sign Ardhavisarga
  { keys: ["H:"], value: "ᳵ" },
  // U+1CF5 - Sign Jihvamuliya
  { keys: ["h:"], value: "ᳶ" }
  // U+1CF6 - Sign Upadhmaniya
]);
const symbolMapping = buildMapping$1([
  { keys: ["||"], value: "॥" },
  // U+0965 - Double Danda
  { keys: ["|"], value: "।" },
  // U+0964 - Danda
  // Note: Single dot "." is NOT mapped to allow nukta/special char sequences like kh., .r, etc.
  // Priority 2: Additional punctuation and special characters
  { keys: [".."], value: "॰" },
  // U+0970 - Abbreviation mark (requires double dot)
  { keys: [".^"], value: "ॱ" },
  // U+0971 - High spacing dot
  { keys: ["A^"], value: "ऀ" },
  // U+0900 - Inverted Candrabindu (Kashmiri)
  { keys: ["^~"], value: "ँ" },
  // U+0901 - Candrabindu (already in diacritics, but can be typed independently)
  { keys: ["^."], value: "़" },
  // U+093C - Nukta (standalone, for manual composition)
  { keys: [".oe~"], value: "ऺ" },
  // U+093A - Vowel Sign OE (standalone)
  { keys: [".ooe~"], value: "ऻ" },
  // U+093B - Vowel Sign OOE (standalone)
  { keys: [".eP"], value: "ॎ" },
  // U+094E - Vowel Sign Prishthamatra E (standalone)
  { keys: [".awP"], value: "ॏ" },
  // U+094F - Vowel Sign Aw (standalone)
  { keys: [".eL"], value: "ॕ" },
  // U+0955 - Vowel Sign Candra Long E (standalone)
  { keys: [".uL"], value: "ॖ" },
  // U+0956 - Vowel Sign Ue (standalone)
  { keys: [".uuL"], value: "ॗ" },
  // U+0957 - Vowel Sign Uue (standalone)
  { keys: [".av"], value: "ऽ" },
  // U+093D - Avagraha (alternate input)
  { keys: ["om", "OM"], value: "ॐ" },
  // U+0950 - Om (already handled but added for completeness)
  // Historical/archaic letters U+0978-U+097D for complete Unicode coverage
  { keys: ["@ma"], value: "ॸ" },
  // U+0978 - Marwari Dda
  { keys: ["@zh"], value: "ॹ" },
  // U+0979 - Zha
  { keys: ["@hy"], value: "ॺ" },
  // U+097A - Heavy Ya
  // U+097B-U+097F already covered in consonantMapping as GG, JJ, DD, BH
  { keys: ["@DD3"], value: "ॽ" },
  // U+097D - Glottal Stop
  // Zero-width characters for ligature control
  { keys: ["ZWJ"], value: "‍" },
  // U+200D - Zero Width Joiner (for ligature control)
  { keys: ["ZWNJ"], value: "‌" }
  // U+200C - Zero Width Non-Joiner (for ligature breaking)
]);
const vedicAccentMapping = buildMapping$1([
  // Main Vedic accents (U+0951-U+0954)
  { keys: ["'1", "^1"], value: "॑" },
  // U+0951 - Udatta (high pitch)
  { keys: ["'2", "_1"], value: "॒" },
  // U+0952 - Anudatta (low pitch)
  { keys: ["'3", "`1"], value: "॓" },
  // U+0953 - Grave accent
  { keys: ["'4", "'1"], value: "॔" },
  // U+0954 - Acute accent
  // Vedic Tone Marks (U+1CD0-U+1CDA)
  { keys: ["'5", "v1"], value: "᳐" },
  // U+1CD0 - Tone Karshana
  { keys: ["'6", "v2"], value: "᳑" },
  // U+1CD1 - Tone Shara
  { keys: ["'7", "v3"], value: "᳒" },
  // U+1CD2 - Tone Prenkha
  { keys: ["'8", "v4"], value: "᳓" },
  // U+1CD3 - Sign Nihshvasa
  { keys: ["'9", "v5"], value: "᳔" },
  // U+1CD4 - Tone Midline Svarita
  { keys: ["'0", "v6"], value: "᳕" },
  // U+1CD5 - Tone Aggravated Independent Svarita
  { keys: ["'a", "v7"], value: "᳖" },
  // U+1CD6 - Tone Independent Svarita
  { keys: ["'b", "v8"], value: "᳗" },
  // U+1CD7 - Tone Kathaka Independent Svarita
  { keys: ["'c", "v9"], value: "᳘" },
  // U+1CD8 - Tone Candra Below
  { keys: ["'d", "v0"], value: "᳙" },
  // U+1CD9 - Tone Kathaka Independent Svarita Schroeder
  { keys: ["'e", "va"], value: "᳚" },
  // U+1CDA - Tone Double Svarita
  // Additional Vedic Extensions (U+1CDB-U+1CDC)
  { keys: ["'f", "vb"], value: "᳛" },
  // U+1CDB - Tone Triple Svarita
  { keys: ["'g", "vc"], value: "᳜" },
  // U+1CDC - Tone Kathaka Anudatta
  { keys: ["'h", "vd"], value: "᳝" },
  // U+1CDD - Tone Dot Below
  // Combining Devanagari Digits and Signs (U+A8E0-U+A8F7)
  { keys: ["c0"], value: "꣠" },
  // U+A8E0 - Combining Digit Zero
  { keys: ["c1"], value: "꣡" },
  // U+A8E1 - Combining Digit One
  { keys: ["c2"], value: "꣢" },
  // U+A8E2 - Combining Digit Two
  { keys: ["c3"], value: "꣣" },
  // U+A8E3 - Combining Digit Three
  { keys: ["c4"], value: "꣤" },
  // U+A8E4 - Combining Digit Four
  { keys: ["c5"], value: "꣥" },
  // U+A8E5 - Combining Digit Five
  { keys: ["c6"], value: "꣦" },
  // U+A8E6 - Combining Digit Six
  { keys: ["c7"], value: "꣧" },
  // U+A8E7 - Combining Digit Seven
  { keys: ["c8"], value: "꣨" },
  // U+A8E8 - Combining Digit Eight
  { keys: ["c9"], value: "꣩" },
  // U+A8E9 - Combining Digit Nine
  { keys: ["c."], value: "꣪" },
  // U+A8EA - Combining Letter A
  { keys: ["cu"], value: "꣫" },
  // U+A8EB - Combining Letter U
  { keys: ["ck"], value: "꣬" },
  // U+A8EC - Combining Letter Ka
  { keys: ["cn"], value: "꣭" },
  // U+A8ED - Combining Letter Na
  { keys: ["cp"], value: "꣮" },
  // U+A8EE - Combining Letter Pa
  { keys: ["cr"], value: "꣯" },
  // U+A8EF - Combining Letter Ra
  { keys: ["cv"], value: "꣰" },
  // U+A8F0 - Combining Letter Vi
  { keys: ["cs"], value: "꣱" },
  // U+A8F1 - Combining Letter Anusvara
  { keys: ["c~"], value: "ꣲ" },
  // U+A8F2 - Combining Sign Anusvara
  { keys: ["c^"], value: "ꣳ" },
  // U+A8F3 - Combining Sign Visarga
  // Additional marks for complete coverage
  { keys: ["'_"], value: "᳖" },
  // Alternate input for tone ardhavisarga
  { keys: ["'="], value: "᳗" },
  // Alternate input for tone pluta
  { keys: ["']"], value: "᳘" },
  // Stress sign anudatta
  { keys: ["'\\\\"], value: "᳙" },
  // Stress sign udatta
  { keys: ["'/"], value: "᳚" },
  // Stress sign kampa
  { keys: ["'|"], value: "᳛" },
  // Grave accent below
  // Om variations and special signs
  { keys: [".om"], value: "᳴" },
  // U+1CF4 - Tone Candra Above
  { keys: ["om."], value: "᳸" },
  // U+1CF8 - Tone Ring Above
  { keys: ["om:"], value: "᳹" }
  // U+1CF9 - Tone Double Ring Above
]);
const isWhitespace = (char) => /\s/.test(char);
const isPunctuation = (char) => /[\p{P}\p{S}]/u.test(char);
const isRomanLetter = (char) => /[a-z]/i.test(char);
const commitPending = (pending, output, tokens, extra = {}) => {
  if (!pending) return null;
  const suffix = extra.suffix ?? "";
  const syllable = `${pending.glyph}${suffix}`;
  output.push(syllable);
  tokens.push({
    source: `${pending.source}${extra.sourceExtension ?? ""}`,
    translated: syllable,
    type: extra.tokenType ?? "syllable"
  });
  return null;
};
const transliterateDetailed = (rawInput, options = {}) => {
  const input = rawInput.normalize("NFC");
  const lowerInput = input.toLowerCase();
  const output = [];
  const tokens = [];
  const halantTriggers = options.halantTriggers ?? DEFAULT_HALANT_TRIGGERS;
  const useDevanagariDigits = options.useDevanagariDigits ?? true;
  let pending = null;
  let index = 0;
  const tryConsumeLexicalWord = (start) => {
    if (!isRomanLetter(input[start])) return null;
    const prev = start === 0 ? "" : input[start - 1];
    if (isRomanLetter(prev)) return null;
    let cursor = start;
    while (cursor < input.length && isRomanLetter(input[cursor])) {
      cursor += 1;
    }
    if (cursor === start) return null;
    const rawWord = input.slice(start, cursor);
    const normalized = normalizeLexicalKey(rawWord);
    if (!normalized) return null;
    const replacement = lexicalWordMap.get(normalized);
    if (!replacement) return null;
    pending = commitPending(pending, output, tokens);
    output.push(replacement);
    tokens.push({ source: rawWord, translated: replacement, type: "syllable" });
    return cursor;
  };
  while (index < input.length) {
    const halantTrigger = halantTriggers.find(
      (trigger) => input.startsWith(trigger, index)
    );
    if (halantTrigger) {
      if (pending) {
        pending = commitPending(pending, output, tokens, {
          suffix: HALANT$1,
          tokenType: "halant",
          sourceExtension: halantTrigger
        });
      } else {
        output.push(HALANT$1);
        tokens.push({ source: halantTrigger, translated: HALANT$1, type: "halant" });
      }
      index += halantTrigger.length;
      continue;
    }
    const lexicalEnd = tryConsumeLexicalWord(index);
    if (lexicalEnd) {
      index = lexicalEnd;
      continue;
    }
    const prevChar = index === 0 ? "" : input[index - 1];
    const nextChar = index + 2 >= input.length ? "" : input[index + 2];
    const omIsIsolated = (!prevChar || isWhitespace(prevChar) || isPunctuation(prevChar)) && (!nextChar || isWhitespace(nextChar) || isPunctuation(nextChar));
    if (!pending && omIsIsolated && lowerInput.startsWith("om", index)) {
      const source = input.slice(index, index + 2);
      output.push("ॐ");
      tokens.push({ source, translated: "ॐ", type: "punctuation" });
      index += 2;
      continue;
    }
    const vedicMatch = matchFromMapping(input, lowerInput, index, vedicAccentMapping);
    if (vedicMatch) {
      output.push(vedicMatch.config);
      tokens.push({ source: vedicMatch.raw, translated: vedicMatch.config, type: "diacritic" });
      index += vedicMatch.raw.length;
      continue;
    }
    const diacriticMatch = matchFromMapping(input, lowerInput, index, diacriticMapping);
    if (diacriticMatch) {
      pending = commitPending(pending, output, tokens);
      output.push(diacriticMatch.config);
      tokens.push({ source: diacriticMatch.raw, translated: diacriticMatch.config, type: "diacritic" });
      index += diacriticMatch.raw.length;
      continue;
    }
    if (!pending) {
      const vowelMatch2 = matchFromMapping(input, lowerInput, index, vowelMapping);
      if (vowelMatch2) {
        const { config, raw } = vowelMatch2;
        output.push(config.independent);
        tokens.push({ source: raw, translated: config.independent, type: "vowel" });
        index += raw.length;
        continue;
      }
    }
    const consonantMatch = matchFromMapping(input, lowerInput, index, consonantMapping);
    if (consonantMatch) {
      let glyph = consonantMatch.config;
      if (consonantMatch.raw.toLowerCase() === "dh") {
        const afterDh = lowerInput.slice(index + consonantMatch.raw.length);
        if (afterDh.startsWith("chh") || afterDh.startsWith("ch")) {
          glyph = "ढ";
        }
      }
      if (pending) {
        pending = commitPending(pending, output, tokens, { suffix: HALANT$1, tokenType: "halant" });
      }
      pending = {
        glyph,
        source: consonantMatch.raw
      };
      index += consonantMatch.raw.length;
      continue;
    }
    const vowelMatch = matchFromMapping(input, lowerInput, index, vowelMapping);
    if (vowelMatch && pending) {
      const { config, raw } = vowelMatch;
      pending = commitPending(pending, output, tokens, {
        suffix: config.matra,
        sourceExtension: raw
      });
      index += raw.length;
      continue;
    }
    const symbolMatch = matchFromMapping(input, lowerInput, index, symbolMapping);
    if (symbolMatch) {
      pending = commitPending(pending, output, tokens);
      output.push(symbolMatch.config);
      tokens.push({ source: symbolMatch.raw, translated: symbolMatch.config, type: "punctuation" });
      index += symbolMatch.raw.length;
      continue;
    }
    const currentChar = input[index];
    if (digitMap$1[currentChar] && useDevanagariDigits) {
      pending = commitPending(pending, output, tokens);
      output.push(digitMap$1[currentChar]);
      tokens.push({ source: currentChar, translated: digitMap$1[currentChar], type: "digit" });
      index += 1;
      continue;
    }
    if (isWhitespace(currentChar)) {
      pending = commitPending(pending, output, tokens);
      output.push(currentChar);
      tokens.push({ source: currentChar, translated: currentChar, type: "whitespace" });
      index += 1;
      continue;
    }
    if (isPunctuation(currentChar)) {
      pending = commitPending(pending, output, tokens);
      output.push(currentChar);
      tokens.push({ source: currentChar, translated: currentChar, type: "punctuation" });
      index += 1;
      continue;
    }
    pending = commitPending(pending, output, tokens);
    output.push(currentChar);
    tokens.push({ source: currentChar, translated: currentChar, type: "other" });
    index += 1;
  }
  pending = commitPending(pending, output, tokens);
  return {
    output: output.join(""),
    tokens
  };
};
const transliterate = (input, options) => transliterateDetailed(input, options).output;
const devanagariToRomanConsonant = /* @__PURE__ */ new Map();
const devanagariToRomanVowel = /* @__PURE__ */ new Map();
const consonantEntries = [
  ["क्ष", "ksh"],
  ["ज्ञ", "gy"],
  ["श्र", "shr"],
  ["न्त्र", "ntr"],
  ["ख्य", "khy"],
  ["त्थ", "tth"],
  ["द्ध", "ddh"],
  ["ङ्ग", "ng"],
  ["त्र", "tr"],
  ["स्व", "sw"],
  ["ख", "kh"],
  ["घ", "gh"],
  ["छ", "chh"],
  ["च", "ch"],
  ["झ", "jh"],
  ["थ", "th"],
  ["ध", "dh"],
  ["फ", "ph"],
  ["भ", "bh"],
  ["श", "sh"],
  ["ञ", "ny"],
  ["ट", "T"],
  ["ठ", "Th"],
  ["ड", "D"],
  ["ढ", "Dh"],
  ["ण", "N"],
  ["ष", "Sh"],
  ["क", "k"],
  ["ग", "g"],
  ["ज", "j"],
  ["त", "t"],
  ["द", "d"],
  ["न", "n"],
  ["प", "p"],
  ["ब", "b"],
  ["म", "m"],
  ["य", "y"],
  ["र", "r"],
  ["ल", "l"],
  ["व", "v"],
  ["स", "s"],
  ["ह", "h"],
  ["फ", "f"]
];
for (const [dev, rom] of consonantEntries) {
  devanagariToRomanConsonant.set(dev, rom);
}
const vowelEntries = [
  ["आ", "ा", "aa"],
  ["अ", "", "a"],
  ["ऐ", "ै", "ai"],
  ["औ", "ौ", "au"],
  ["ई", "ी", "ee"],
  ["ए", "े", "e"],
  ["ऊ", "ू", "oo"],
  ["ओ", "ो", "o"],
  ["ऋ", "ृ", "ri"],
  ["इ", "ि", "i"],
  ["उ", "ु", "u"]
];
for (const [independent, matra, roman] of vowelEntries) {
  devanagariToRomanVowel.set(independent, { independent: roman, matra: roman });
  if (matra) {
    devanagariToRomanVowel.set(matra, { independent: roman, matra: roman });
  }
}
const diacriticToRoman = /* @__PURE__ */ new Map([
  ["ं", "m~"],
  ["ँ", "n~"],
  ["ः", "h~"]
]);
const symbolToRoman = /* @__PURE__ */ new Map([
  ["॥", "||"],
  ["।", "|"]
]);
const nepaliDigitToRoman = /* @__PURE__ */ new Map([
  ["०", "0"],
  ["१", "1"],
  ["२", "2"],
  ["३", "3"],
  ["४", "4"],
  ["५", "5"],
  ["६", "6"],
  ["७", "7"],
  ["८", "8"],
  ["९", "9"]
]);
const isDevanagariChar = (char) => {
  const code = char.charCodeAt(0);
  return code >= 2304 && code <= 2431;
};
const reverseTransliterate = (input, options = {}) => {
  const useLatinDigits = options.useLatinDigits ?? true;
  const output = [];
  let index = 0;
  const nepaliToRoman = /* @__PURE__ */ new Map();
  for (const entry of LEXICON_ENTRIES) {
    nepaliToRoman.set(entry.nepali, entry.roman);
  }
  while (index < input.length) {
    const char = input[index];
    let matched = false;
    for (let len = Math.min(20, input.length - index); len >= 3; len--) {
      const substr = input.slice(index, index + len);
      const romanEquiv = nepaliToRoman.get(substr);
      if (romanEquiv) {
        output.push(romanEquiv);
        index += len;
        matched = true;
        break;
      }
    }
    if (matched) continue;
    if (nepaliDigitToRoman.has(char) && useLatinDigits) {
      output.push(nepaliDigitToRoman.get(char));
      index += 1;
      continue;
    }
    if (symbolToRoman.has(char)) {
      output.push(symbolToRoman.get(char));
      index += 1;
      continue;
    }
    if (diacriticToRoman.has(char)) {
      output.push(diacriticToRoman.get(char));
      index += 1;
      continue;
    }
    if (devanagariToRomanVowel.has(char)) {
      const vowel = devanagariToRomanVowel.get(char);
      output.push(vowel.independent);
      index += 1;
      continue;
    }
    let clusterMatched = false;
    for (let len = 4; len >= 2; len--) {
      const cluster = input.slice(index, index + len);
      if (devanagariToRomanConsonant.has(cluster)) {
        output.push(devanagariToRomanConsonant.get(cluster));
        index += len;
        clusterMatched = true;
        break;
      }
    }
    if (clusterMatched) {
      const nextChar = input[index];
      if (nextChar && devanagariToRomanVowel.has(nextChar)) {
        const vowel = devanagariToRomanVowel.get(nextChar);
        output.push(vowel.matra);
        index += 1;
      } else if (nextChar !== HALANT$1) {
        output.push("a");
      }
      continue;
    }
    if (devanagariToRomanConsonant.has(char)) {
      output.push(devanagariToRomanConsonant.get(char));
      index += 1;
      const nextChar = input[index];
      if (nextChar && devanagariToRomanVowel.has(nextChar)) {
        const vowel = devanagariToRomanVowel.get(nextChar);
        output.push(vowel.matra);
        index += 1;
      } else if (nextChar === HALANT$1) {
        index += 1;
      } else if (nextChar && isDevanagariChar(nextChar) && !devanagariToRomanConsonant.has(nextChar)) {
        output.push("a");
      } else if (!nextChar || !isDevanagariChar(nextChar)) {
        output.push("a");
      }
      continue;
    }
    if (char === "ॐ") {
      output.push("om");
      index += 1;
      continue;
    }
    output.push(char);
    index += 1;
  }
  return output.join("");
};
class HistoryManager {
  history = [];
  currentIndex = -1;
  maxHistory;
  mergeDelay;
  lastTimestamp = 0;
  constructor(options = {}) {
    this.maxHistory = options.maxHistory ?? 100;
    this.mergeDelay = options.mergeDelay ?? 300;
  }
  /**
   * Push a new state to history
   */
  push(value, cursorPosition) {
    const now = Date.now();
    const shouldMerge = now - this.lastTimestamp < this.mergeDelay && this.history.length > 0;
    if (this.currentIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.currentIndex + 1);
    }
    if (shouldMerge && this.history.length > 0) {
      this.history[this.history.length - 1] = {
        value,
        cursorPosition,
        timestamp: now
      };
    } else {
      this.history.push({
        value,
        cursorPosition,
        timestamp: now
      });
      if (this.history.length > this.maxHistory) {
        this.history.shift();
      } else {
        this.currentIndex++;
      }
    }
    this.lastTimestamp = now;
  }
  /**
   * Undo to previous state
   */
  undo() {
    if (!this.canUndo()) return null;
    this.currentIndex--;
    return this.history[this.currentIndex];
  }
  /**
   * Redo to next state
   */
  redo() {
    if (!this.canRedo()) return null;
    this.currentIndex++;
    return this.history[this.currentIndex];
  }
  /**
   * Check if undo is available
   */
  canUndo() {
    return this.currentIndex > 0;
  }
  /**
   * Check if redo is available
   */
  canRedo() {
    return this.currentIndex < this.history.length - 1;
  }
  /**
   * Get current state
   */
  current() {
    if (this.currentIndex < 0 || this.currentIndex >= this.history.length) {
      return null;
    }
    return this.history[this.currentIndex];
  }
  /**
   * Clear all history
   */
  clear() {
    this.history = [];
    this.currentIndex = -1;
    this.lastTimestamp = 0;
  }
  /**
   * Get history size
   */
  size() {
    return this.history.length;
  }
  /**
   * Get current index
   */
  getCurrentIndex() {
    return this.currentIndex;
  }
  /**
   * Reset to a specific state without affecting history
   */
  jumpTo(index) {
    if (index < 0 || index >= this.history.length) return null;
    this.currentIndex = index;
    return this.history[index];
  }
}
const digitMap = {
  "0": "०",
  "1": "१",
  "2": "२",
  "3": "३",
  "4": "४",
  "5": "५",
  "6": "६",
  "7": "७",
  "8": "८",
  "9": "९"
};
class NepaliIMECore {
  state;
  options;
  history;
  convertedBuffer;
  committedOutput;
  constructor(options = {}) {
    this.options = {
      useDevanagariDigits: options.useDevanagariDigits ?? true,
      onStateChange: options.onStateChange ?? (() => {
      }),
      enableHistory: options.enableHistory ?? true,
      maxHistory: options.maxHistory ?? 100
    };
    this.state = {
      romanBuffer: [],
      currentWord: "",
      output: "",
      cursorPosition: 0
    };
    this.convertedBuffer = [];
    this.committedOutput = "";
    this.history = this.options.enableHistory ? new HistoryManager({ maxHistory: this.options.maxHistory }) : null;
  }
  /**
   * Get current state
   */
  getState() {
    return { ...this.state };
  }
  /**
   * Handle keyboard input
   * Returns true if the event was handled, false otherwise
   */
  handleKey(key, modifiers = {}) {
    if (modifiers.ctrl || modifiers.meta) {
      if (key === "z" && !(modifiers.alt || modifiers.ctrl && modifiers.meta)) {
        this.undo();
        return true;
      }
      if ((key === "y" || key === "z" && modifiers.shift) && !modifiers.alt) {
        this.redo();
        return true;
      }
    }
    if (modifiers.ctrl || modifiers.meta || modifiers.alt) {
      if (key !== "Backspace" && key !== "Delete") {
        return false;
      }
    }
    const navigationKeys = [
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "Home",
      "End",
      "PageUp",
      "PageDown",
      "Tab",
      "Escape",
      "Insert",
      "F1",
      "F2",
      "F3",
      "F4",
      "F5",
      "F6",
      "F7",
      "F8",
      "F9",
      "F10",
      "F11",
      "F12",
      "CapsLock",
      "NumLock",
      "ScrollLock",
      "Pause",
      "PrintScreen",
      "ContextMenu",
      "Meta",
      "Control",
      "Alt",
      "Shift"
    ];
    if (navigationKeys.includes(key)) {
      return false;
    }
    if (key === "Backspace" || key === "Delete") {
      this.deleteCharacter();
      this.updateOutput();
      this.pushHistory();
      return true;
    }
    if (/^[0-9]$/.test(key)) {
      this.commitCurrentWord();
      const digit = this.options.useDevanagariDigits ? digitMap[key] : key;
      this.pushSegment(digit);
      this.updateOutput();
      return true;
    }
    if (this.isPunctuation(key)) {
      this.commitCurrentWord();
      const punct = key === "|" ? "।" : key;
      this.pushSegment(punct);
      this.updateOutput();
      return true;
    }
    if (key === " ") {
      this.commitCurrentWord();
      this.pushSegment(" ");
      this.updateOutput();
      return true;
    }
    if (key === "Enter") {
      this.commitCurrentWord();
      this.pushSegment("\n");
      this.updateOutput();
      return true;
    }
    if (/^[a-zA-Z~^`.'"]$/.test(key)) {
      this.state.currentWord += key;
      this.updateOutput();
      this.pushHistory();
      return true;
    }
    if (key.length === 1) {
      this.commitCurrentWord();
      this.pushSegment(key);
      this.updateOutput();
      this.pushHistory();
      return true;
    }
    return false;
  }
  /**
   * Insert text (e.g., from paste)
   */
  insertText(text) {
    this.commitCurrentWord();
    this.pushSegment(text);
    this.updateOutput();
    this.pushHistory();
  }
  /**
   * Clear all content
   */
  clear() {
    this.state.romanBuffer = [];
    this.state.currentWord = "";
    this.convertedBuffer = [];
    this.committedOutput = "";
    this.updateOutput();
  }
  /**
   * Set content directly (useful for framework integration)
   */
  setValue(value) {
    this.state.romanBuffer = [];
    this.convertedBuffer = [];
    this.committedOutput = "";
    if (value) {
      this.pushSegment(value);
    }
    this.state.currentWord = "";
    this.updateOutput();
  }
  /**
   * Get current output value
   */
  getValue() {
    return this.state.output;
  }
  /**
   * Update digit conversion setting
   */
  setUseDevanagariDigits(value) {
    this.options.useDevanagariDigits = value;
    this.rebuildConvertedBuffer();
    this.updateOutput();
  }
  /**
   * Get digit conversion setting
   */
  getUseDevanagariDigits() {
    return this.options.useDevanagariDigits;
  }
  // Private helper methods
  commitCurrentWord() {
    if (this.state.currentWord) {
      this.pushSegment(this.state.currentWord);
      this.state.currentWord = "";
    }
  }
  deleteCharacter() {
    if (this.state.currentWord.length > 0) {
      this.state.currentWord = this.state.currentWord.slice(0, -1);
    } else if (this.state.romanBuffer.length > 0) {
      const lastSegment = this.popSegment();
      if (!lastSegment) return;
      if (lastSegment.length > 1) {
        this.pushSegment(lastSegment.slice(0, -1));
      }
    }
  }
  isPunctuation(key) {
    return key === "|" || key === "!" || key === "?" || key === "," || key === ";" || key === ":";
  }
  convertSegment(segment) {
    if (/^[\s।॥!?,;:\n]+$/.test(segment)) {
      return segment;
    }
    if (/^[०-९]+$/.test(segment)) {
      return segment;
    }
    return transliterate(segment, { useDevanagariDigits: this.options.useDevanagariDigits });
  }
  updateOutput() {
    let output = this.committedOutput;
    if (this.state.currentWord) {
      output += transliterate(this.state.currentWord, {
        useDevanagariDigits: this.options.useDevanagariDigits
      });
    }
    this.state.output = output;
    this.state.cursorPosition = output.length;
    this.options.onStateChange(this.getState());
  }
  pushSegment(segment) {
    const converted = this.convertSegment(segment);
    this.state.romanBuffer.push(segment);
    this.convertedBuffer.push(converted);
    this.committedOutput += converted;
  }
  popSegment() {
    if (this.state.romanBuffer.length === 0) {
      return null;
    }
    const raw = this.state.romanBuffer.pop();
    const converted = this.convertedBuffer.pop() ?? "";
    if (converted.length > 0) {
      this.committedOutput = this.committedOutput.slice(0, -converted.length);
    }
    return raw;
  }
  rebuildConvertedBuffer() {
    this.convertedBuffer = [];
    this.committedOutput = "";
    for (const segment of this.state.romanBuffer) {
      const converted = this.convertSegment(segment);
      this.convertedBuffer.push(converted);
      this.committedOutput += converted;
    }
  }
  pushHistory() {
    if (this.history) {
      this.history.push(this.state.output, this.state.cursorPosition);
    }
  }
  /**
   * Undo last change
   */
  undo() {
    if (!this.history || !this.history.canUndo()) {
      return false;
    }
    const state = this.history.undo();
    if (state) {
      this.setValue(state.value);
      return true;
    }
    return false;
  }
  /**
   * Redo last undone change
   */
  redo() {
    if (!this.history || !this.history.canRedo()) {
      return false;
    }
    const state = this.history.redo();
    if (state) {
      this.setValue(state.value);
      return true;
    }
    return false;
  }
  /**
   * Check if undo is available
   */
  canUndo() {
    return this.history?.canUndo() ?? false;
  }
  /**
   * Check if redo is available
   */
  canRedo() {
    return this.history?.canRedo() ?? false;
  }
  /**
   * Clear undo/redo history
   */
  clearHistory() {
    this.history?.clear();
  }
}
class KeyboardShortcutManager {
  shortcuts = /* @__PURE__ */ new Map();
  enabled = true;
  preventDefault = true;
  constructor(options = {}) {
    this.enabled = options.enabled ?? true;
    this.preventDefault = options.preventDefault ?? true;
  }
  /**
   * Register a keyboard shortcut
   */
  register(shortcut) {
    const key = this.getShortcutKey(shortcut);
    this.shortcuts.set(key, shortcut);
  }
  /**
   * Unregister a keyboard shortcut
   */
  unregister(key, modifiers) {
    const shortcutKey = this.getShortcutKey({ key, ...modifiers });
    this.shortcuts.delete(shortcutKey);
  }
  /**
   * Handle keyboard event
   */
  handleEvent(event) {
    if (!this.enabled) return false;
    const shortcutKey = this.getShortcutKeyFromEvent(event);
    const shortcut = this.shortcuts.get(shortcutKey);
    if (shortcut) {
      if (this.preventDefault) {
        event.preventDefault();
      }
      const result = shortcut.handler(event);
      return result !== false;
    }
    return false;
  }
  /**
   * Get all registered shortcuts
   */
  getShortcuts() {
    return Array.from(this.shortcuts.values());
  }
  /**
   * Get shortcuts by category
   */
  getShortcutsByCategory(category) {
    return Array.from(this.shortcuts.values()).filter((s) => s.category === category);
  }
  /**
   * Enable/disable shortcut manager
   */
  setEnabled(enabled) {
    this.enabled = enabled;
  }
  /**
   * Check if enabled
   */
  isEnabled() {
    return this.enabled;
  }
  /**
   * Clear all shortcuts
   */
  clear() {
    this.shortcuts.clear();
  }
  /**
   * Get shortcut display string
   */
  getShortcutDisplay(shortcut) {
    const parts = [];
    const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad|iPod/.test(navigator.platform);
    if (shortcut.ctrl) parts.push(isMac ? "⌘" : "Ctrl");
    if (shortcut.shift) parts.push(isMac ? "⇧" : "Shift");
    if (shortcut.alt) parts.push(isMac ? "⌥" : "Alt");
    if (shortcut.meta && !isMac) parts.push("Win");
    let keyDisplay = shortcut.key;
    if (keyDisplay.length === 1) {
      keyDisplay = keyDisplay.toUpperCase();
    } else if (keyDisplay === " ") {
      keyDisplay = "Space";
    }
    parts.push(keyDisplay);
    return parts.join("+");
  }
  // Private methods
  getShortcutKey(shortcut) {
    const parts = [];
    if (shortcut.ctrl) parts.push("ctrl");
    if (shortcut.shift) parts.push("shift");
    if (shortcut.alt) parts.push("alt");
    if (shortcut.meta) parts.push("meta");
    parts.push(shortcut.key.toLowerCase());
    return parts.join("+");
  }
  getShortcutKeyFromEvent(event) {
    const parts = [];
    if (event.ctrlKey) parts.push("ctrl");
    if (event.shiftKey) parts.push("shift");
    if (event.altKey) parts.push("alt");
    if (event.metaKey) parts.push("meta");
    parts.push(event.key.toLowerCase());
    return parts.join("+");
  }
}
const createDefaultShortcuts = () => [
  {
    key: "z",
    ctrl: true,
    description: "Undo last change",
    category: "editing",
    handler: () => {
      return true;
    }
  },
  {
    key: "y",
    ctrl: true,
    description: "Redo last undone change",
    category: "editing",
    handler: () => {
      return true;
    }
  },
  {
    key: "z",
    ctrl: true,
    shift: true,
    description: "Redo last undone change",
    category: "editing",
    handler: () => {
      return true;
    }
  },
  {
    key: " ",
    ctrl: true,
    description: "Toggle conversion mode",
    category: "conversion",
    handler: () => {
      return true;
    }
  },
  {
    key: "d",
    ctrl: true,
    description: "Toggle Devanagari/Latin digits",
    category: "conversion",
    handler: () => {
      return true;
    }
  },
  {
    key: "l",
    ctrl: true,
    description: "Clear all content",
    category: "editing",
    handler: () => {
      return true;
    }
  },
  {
    key: "f",
    ctrl: true,
    description: "Find text",
    category: "search",
    handler: () => {
      return true;
    }
  },
  {
    key: "h",
    ctrl: true,
    description: "Replace text",
    category: "search",
    handler: () => {
      return true;
    }
  },
  {
    key: "/",
    ctrl: true,
    description: "Show keyboard shortcuts",
    category: "help",
    handler: () => {
      return true;
    }
  },
  {
    key: "F1",
    description: "Show help",
    category: "help",
    handler: () => {
      return true;
    }
  },
  {
    key: "ArrowLeft",
    alt: true,
    description: "Switch to Roman → Nepali",
    category: "conversion",
    handler: () => {
      return true;
    }
  },
  {
    key: "ArrowRight",
    alt: true,
    description: "Switch to Nepali → Roman",
    category: "conversion",
    handler: () => {
      return true;
    }
  },
  {
    key: "c",
    ctrl: true,
    shift: true,
    description: "Copy output to clipboard",
    category: "clipboard",
    handler: () => {
      return true;
    }
  },
  {
    key: "s",
    ctrl: true,
    description: "Save current work",
    category: "file",
    handler: () => {
      return true;
    }
  },
  {
    key: "Escape",
    description: "Close dialog or cancel",
    category: "navigation",
    handler: () => {
      return true;
    }
  }
];
class TrieNode {
  children = /* @__PURE__ */ new Map();
  entries = [];
  isEndOfWord = false;
}
class AutocompleteManager {
  root = new TrieNode();
  options;
  userHistory = /* @__PURE__ */ new Map();
  constructor(options = {}) {
    this.options = {
      maxSuggestions: options.maxSuggestions ?? 5,
      minPrefixLength: options.minPrefixLength ?? 2,
      useFrequency: options.useFrequency ?? true,
      caseSensitive: options.caseSensitive ?? false
    };
  }
  /**
   * Add word to dictionary
   */
  addWord(entry) {
    const key = this.normalizeKey(entry.roman);
    let node = this.root;
    for (const char of key) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char);
    }
    node.isEndOfWord = true;
    node.entries.push(entry);
  }
  /**
   * Add multiple words
   */
  addWords(entries) {
    for (const entry of entries) {
      this.addWord(entry);
    }
  }
  /**
   * Get suggestions for prefix
   */
  getSuggestions(prefix) {
    if (prefix.length < this.options.minPrefixLength) {
      return [];
    }
    const key = this.normalizeKey(prefix);
    let node = this.root;
    for (const char of key) {
      if (!node.children.has(char)) {
        return [];
      }
      node = node.children.get(char);
    }
    const suggestions = [];
    this.collectSuggestions(node, suggestions);
    suggestions.sort((a, b) => b.score - a.score);
    return suggestions.slice(0, this.options.maxSuggestions);
  }
  /**
   * Record user selection to improve future suggestions
   */
  recordSelection(roman) {
    const key = this.normalizeKey(roman);
    const count = this.userHistory.get(key) || 0;
    this.userHistory.set(key, count + 1);
  }
  /**
   * Clear user history
   */
  clearHistory() {
    this.userHistory.clear();
  }
  /**
   * Get dictionary size
   */
  size() {
    return this.countNodes(this.root);
  }
  /**
   * Export user history for persistence
   */
  exportHistory() {
    return Object.fromEntries(this.userHistory);
  }
  /**
   * Import user history from storage
   */
  importHistory(history) {
    this.userHistory = new Map(Object.entries(history));
  }
  // Private methods
  normalizeKey(text) {
    return this.options.caseSensitive ? text : text.toLowerCase();
  }
  collectSuggestions(node, suggestions) {
    if (node.isEndOfWord) {
      for (const entry of node.entries) {
        const userScore = this.userHistory.get(this.normalizeKey(entry.roman)) || 0;
        const frequencyScore = this.options.useFrequency ? entry.frequency : 1;
        const score = frequencyScore + userScore * 10;
        suggestions.push({
          roman: entry.roman,
          nepali: entry.nepali,
          score
        });
      }
    }
    for (const child of node.children.values()) {
      this.collectSuggestions(child, suggestions);
    }
  }
  countNodes(node) {
    let count = node.isEndOfWord ? node.entries.length : 0;
    for (const child of node.children.values()) {
      count += this.countNodes(child);
    }
    return count;
  }
}
const COMMON_WORDS = [
  // Greetings & Common Phrases (High frequency)
  { roman: "namaste", nepali: "नमस्ते", frequency: 100 },
  { roman: "namaskar", nepali: "नमस्कार", frequency: 95 },
  { roman: "dhanyabad", nepali: "धन्यवाद", frequency: 90 },
  { roman: "shukriya", nepali: "शुक्रिया", frequency: 85 },
  { roman: "tapai", nepali: "तपाई", frequency: 80 },
  { roman: "hajur", nepali: "हजुर", frequency: 75 },
  // Pronouns (High frequency)
  { roman: "ma", nepali: "म", frequency: 100 },
  { roman: "hami", nepali: "हामी", frequency: 90 },
  { roman: "timro", nepali: "तिम्रो", frequency: 85 },
  { roman: "mero", nepali: "मेरो", frequency: 95 },
  { roman: "timi", nepali: "तिमी", frequency: 88 },
  { roman: "yo", nepali: "यो", frequency: 92 },
  { roman: "tyo", nepali: "त्यो", frequency: 87 },
  // Common Verbs
  { roman: "garnu", nepali: "गर्नु", frequency: 85 },
  { roman: "huncha", nepali: "हुन्छ", frequency: 90 },
  { roman: "cha", nepali: "छ", frequency: 95 },
  { roman: "chaina", nepali: "छैन", frequency: 88 },
  { roman: "janchu", nepali: "जान्छु", frequency: 75 },
  { roman: "aunu", nepali: "आउनु", frequency: 80 },
  { roman: "khanu", nepali: "खानु", frequency: 78 },
  { roman: "bolnu", nepali: "बोल्नु", frequency: 76 },
  // Common Adjectives
  { roman: "ramro", nepali: "राम्रो", frequency: 85 },
  { roman: "thulo", nepali: "ठुलो", frequency: 75 },
  { roman: "sano", nepali: "सानो", frequency: 74 },
  { roman: "mitho", nepali: "मिठो", frequency: 72 },
  { roman: "naya", nepali: "नयाँ", frequency: 78 },
  // Family Relations
  { roman: "aama", nepali: "आमा", frequency: 90 },
  { roman: "buwa", nepali: "बुवा", frequency: 88 },
  { roman: "didi", nepali: "दिदी", frequency: 82 },
  { roman: "bhai", nepali: "भाइ", frequency: 84 },
  { roman: "bahini", nepali: "बहिनी", frequency: 80 },
  { roman: "daai", nepali: "दाइ", frequency: 81 },
  // Common Nouns
  { roman: "ghar", nepali: "घर", frequency: 85 },
  { roman: "paani", nepali: "पानी", frequency: 80 },
  { roman: "khana", nepali: "खाना", frequency: 82 },
  { roman: "kitab", nepali: "किताब", frequency: 70 },
  { roman: "skul", nepali: "स्कूल", frequency: 75 },
  { roman: "kaam", nepali: "काम", frequency: 78 },
  { roman: "samaya", nepali: "समय", frequency: 76 },
  // Question Words
  { roman: "kasto", nepali: "कस्तो", frequency: 80 },
  { roman: "kasari", nepali: "कसरी", frequency: 78 },
  { roman: "kahile", nepali: "कहिले", frequency: 79 },
  { roman: "kaha", nepali: "कहाँ", frequency: 81 },
  { roman: "kun", nepali: "कुन", frequency: 77 },
  { roman: "ko", nepali: "को", frequency: 90 },
  // Time & Date
  { roman: "aaja", nepali: "आज", frequency: 85 },
  { roman: "bholi", nepali: "भोली", frequency: 82 },
  { roman: "hijo", nepali: "हिजो", frequency: 80 },
  { roman: "bihana", nepali: "बिहान", frequency: 75 },
  { roman: "beluka", nepali: "बेलुका", frequency: 74 },
  // Common Phrases
  { roman: "kripaya", nepali: "कृपया", frequency: 70 },
  { roman: "maaf", nepali: "माफ", frequency: 72 },
  { roman: "thik", nepali: "ठिक", frequency: 80 },
  { roman: "asti", nepali: "अस्ति", frequency: 68 },
  // Cities (Medium frequency)
  { roman: "Kathmandu", nepali: "काठमाडौं", frequency: 85 },
  { roman: "Pokhara", nepali: "पोखरा", frequency: 75 },
  { roman: "Biratnagar", nepali: "विराटनगर", frequency: 60 },
  { roman: "Lalitpur", nepali: "ललितपुर", frequency: 65 },
  { roman: "Bhaktapur", nepali: "भक्तपुर", frequency: 63 },
  // Countries
  { roman: "Nepal", nepali: "नेपाल", frequency: 95 },
  { roman: "Bharat", nepali: "भारत", frequency: 70 },
  { roman: "America", nepali: "अमेरिका", frequency: 65 },
  { roman: "China", nepali: "चीन", frequency: 62 },
  // Numbers in words
  { roman: "ek", nepali: "एक", frequency: 75 },
  { roman: "dui", nepali: "दुई", frequency: 72 },
  { roman: "tin", nepali: "तीन", frequency: 70 },
  { roman: "char", nepali: "चार", frequency: 68 },
  { roman: "panch", nepali: "पाँच", frequency: 67 }
];
class CharacterSelector {
  element;
  alternatives = [];
  selectedIndex = 0;
  options;
  isVisible = false;
  constructor(options) {
    this.options = {
      onSelect: options.onSelect,
      onCancel: options.onCancel,
      position: options.position ?? { x: 0, y: 0 },
      theme: options.theme ?? "light"
    };
    this.element = this.createPopoverElement();
    document.body.appendChild(this.element);
    this.attachEventListeners();
  }
  createPopoverElement() {
    const popover = document.createElement("div");
    popover.className = "nepali-char-selector";
    popover.style.cssText = `
            position: fixed;
            background: white;
            border: 2px solid #667eea;
            border-radius: 8px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
            padding: 8px 0;
            min-width: 300px;
            max-width: 400px;
            z-index: 10000;
            display: none;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        `;
    return popover;
  }
  attachEventListeners() {
    document.addEventListener("keydown", this.handleKeydown);
    document.addEventListener("click", this.handleClickOutside);
  }
  handleKeydown = (e) => {
    if (!this.isVisible) return;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        this.selectedIndex = Math.min(this.selectedIndex + 1, this.alternatives.length - 1);
        this.updateSelection();
        break;
      case "ArrowUp":
        e.preventDefault();
        this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
        this.updateSelection();
        break;
      case "Enter":
      case "Tab":
        e.preventDefault();
        this.selectCurrent();
        break;
      case "Escape":
        e.preventDefault();
        this.hide();
        this.options.onCancel();
        break;
      default:
        if (/^[1-9]$/.test(e.key)) {
          const index = parseInt(e.key) - 1;
          if (index < this.alternatives.length) {
            e.preventDefault();
            this.selectedIndex = index;
            this.selectCurrent();
          }
        }
        break;
    }
  };
  handleClickOutside = (e) => {
    if (!this.isVisible) return;
    if (!this.element.contains(e.target)) {
      this.hide();
      this.options.onCancel();
    }
  };
  updateSelection() {
    const items = this.element.querySelectorAll(".char-item");
    items.forEach((item, index) => {
      if (index === this.selectedIndex) {
        item.classList.add("selected");
        item.scrollIntoView({ block: "nearest", behavior: "smooth" });
      } else {
        item.classList.remove("selected");
      }
    });
  }
  selectCurrent() {
    const selected = this.alternatives[this.selectedIndex];
    if (selected) {
      this.options.onSelect(selected.character);
      this.hide();
    }
  }
  /**
   * Show the character selector with alternatives
   */
  show(alternatives, position) {
    if (alternatives.length === 0) return;
    if (alternatives.length === 1) {
      this.options.onSelect(alternatives[0].character);
      return;
    }
    this.alternatives = alternatives;
    this.selectedIndex = 0;
    this.isVisible = true;
    this.element.innerHTML = `
            <div style="padding: 8px 12px; border-bottom: 1px solid #e0e0e0; background: #f8f9fa;">
                <strong style="color: #667eea; font-size: 12px;">Select Character (↑↓ or 1-9)</strong>
            </div>
            <div style="max-height: 300px; overflow-y: auto;">
                ${alternatives.map((alt, index) => this.renderAlternative(alt, index)).join("")}
            </div>
            <div style="padding: 6px 12px; border-top: 1px solid #e0e0e0; background: #f8f9fa; font-size: 11px; color: #666;">
                Press Enter or click to select • Esc to cancel
            </div>
        `;
    const pos = position ?? this.options.position;
    this.element.style.left = `${pos.x}px`;
    this.element.style.top = `${pos.y}px`;
    this.element.style.display = "block";
    setTimeout(() => this.adjustPosition(), 0);
    this.updateSelection();
  }
  renderAlternative(alt, index) {
    const categoryColors = {
      "nukta": "#e74c3c",
      "dravidian": "#3498db",
      "marathi": "#f39c12",
      "kashmiri": "#9b59b6",
      "vedic": "#2ecc71",
      "basic": "#34495e"
    };
    const color = categoryColors[alt.category.toLowerCase()] ?? categoryColors.basic;
    return `
            <div class="char-item" data-index="${index}" style="
                padding: 10px 12px;
                cursor: pointer;
                border-bottom: 1px solid #f0f0f0;
                transition: background 0.2s;
                display: flex;
                align-items: center;
                gap: 12px;
            " onmouseover="this.style.background='#f8f9ff'"
               onmouseout="this.classList.contains('selected') ? this.style.background='#e8ecff' : this.style.background='white'"
               onclick="window.nepaliCharSelector?.selectIndex(${index})">
                <div style="
                    font-size: 32px;
                    font-weight: bold;
                    color: #764ba2;
                    min-width: 40px;
                    text-align: center;
                ">${alt.character}</div>
                <div style="flex: 1;">
                    <div style="font-weight: 600; color: #1a1a1a; margin-bottom: 2px;">
                        ${alt.description}
                    </div>
                    <div style="font-size: 11px; color: #666;">
                        <span style="background: ${color}; color: white; padding: 2px 6px; border-radius: 3px; margin-right: 6px; font-weight: 600;">
                            ${alt.category}
                        </span>
                        Input: <code style="background: #f0f0f0; padding: 2px 4px; border-radius: 3px; font-family: monospace;">${alt.input}</code>
                        <span style="margin-left: 8px; color: #999;">${alt.unicode}</span>
                    </div>
                </div>
                <div style="
                    background: #667eea;
                    color: white;
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    font-weight: bold;
                ">${index + 1}</div>
            </div>
        `;
  }
  adjustPosition() {
    const rect = this.element.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    let left = parseFloat(this.element.style.left);
    let top = parseFloat(this.element.style.top);
    if (rect.right > viewportWidth) {
      left = viewportWidth - rect.width - 20;
    }
    if (left < 10) {
      left = 10;
    }
    if (rect.bottom > viewportHeight) {
      top = viewportHeight - rect.height - 20;
    }
    if (top < 10) {
      top = 10;
    }
    this.element.style.left = `${left}px`;
    this.element.style.top = `${top}px`;
  }
  /**
   * Hide the popover
   */
  hide() {
    this.isVisible = false;
    this.element.style.display = "none";
    this.alternatives = [];
    this.selectedIndex = 0;
  }
  /**
   * Select an alternative by index (used by onclick handler)
   */
  selectIndex(index) {
    if (index >= 0 && index < this.alternatives.length) {
      this.selectedIndex = index;
      this.selectCurrent();
    }
  }
  /**
   * Check if the popover is currently visible
   */
  isOpen() {
    return this.isVisible;
  }
  /**
   * Destroy the popover and clean up
   */
  destroy() {
    document.removeEventListener("keydown", this.handleKeydown);
    document.removeEventListener("click", this.handleClickOutside);
    if (this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }
}
const style = document.createElement("style");
style.textContent = `
    .char-item.selected {
        background: #e8ecff !important;
        border-left: 4px solid #667eea;
    }
`;
document.head.appendChild(style);
const getCharacterAlternatives = (input) => {
  const alternatives = [];
  const lowerInput = input.toLowerCase();
  const mappings = {
    "o^": [
      { character: "ओ", description: "Long O", input: "o", unicode: "U+0913", category: "Basic" },
      { character: "ऑ", description: "Candra O (English loanwords)", input: "o^", unicode: "U+0911", category: "Basic" }
    ],
    "aw": [
      { character: "औ", description: "Au diphthong", input: "au", unicode: "U+0914", category: "Basic" },
      { character: "ऑ", description: "Candra O", input: "aw", unicode: "U+0911", category: "Basic" }
    ]
  };
  if (mappings[lowerInput]) {
    return mappings[lowerInput];
  }
  return alternatives;
};
const buildMapping = (entries) => {
  const sensitive = [];
  const insensitive = [];
  for (const entry of entries) {
    for (const key of entry.keys) {
      if (!key) continue;
      if (entry.caseSensitive) {
        sensitive.push({ key, value: entry.value });
      } else {
        insensitive.push({ key: key.toLowerCase(), value: entry.value });
      }
    }
  }
  sensitive.sort((a, b) => b.key.length - a.key.length);
  insensitive.sort((a, b) => b.key.length - a.key.length);
  return { sensitive, insensitive };
};
const HALANT = "्";
const createSchemeConverter = (config) => {
  const {
    consonants,
    vowelMatras,
    independentVowels,
    diacritics,
    maxKeyLength = 4,
    caseSensitive = false
  } = config;
  const tryMatch = (text, pos, map, isCaseSensitive) => {
    for (let len = maxKeyLength; len >= 1; len--) {
      const substr = text.slice(pos, pos + len);
      const lookupKey = isCaseSensitive ? substr : substr.toLowerCase();
      if (isCaseSensitive) {
        if (map[substr]) {
          return { key: substr, value: map[substr] };
        }
      } else {
        if (map[lookupKey]) {
          return { key: substr, value: map[lookupKey] };
        }
      }
    }
    return null;
  };
  return (text) => {
    let result = "";
    let i = 0;
    let pendingConsonant = null;
    const flushPendingConsonant = (addInherentA = true) => {
      if (pendingConsonant) {
        result += pendingConsonant;
        if (!addInherentA) {
          result += HALANT;
        }
        pendingConsonant = null;
      }
    };
    while (i < text.length) {
      const diacriticMatch = tryMatch(text, i, diacritics, caseSensitive);
      if (diacriticMatch) {
        flushPendingConsonant(true);
        result += diacriticMatch.value;
        i += diacriticMatch.key.length;
        continue;
      }
      const consonantMatch = tryMatch(text, i, consonants, caseSensitive);
      if (consonantMatch) {
        if (pendingConsonant) {
          result += pendingConsonant + HALANT;
        }
        pendingConsonant = consonantMatch.value;
        i += consonantMatch.key.length;
        continue;
      }
      const vowelMatch = tryMatch(text, i, independentVowels, caseSensitive);
      if (vowelMatch) {
        if (pendingConsonant) {
          result += pendingConsonant;
          const matraKey = caseSensitive ? vowelMatch.key : vowelMatch.key.toLowerCase();
          const matra = vowelMatras[matraKey] || vowelMatras[vowelMatch.key];
          if (matra && vowelMatch.key.toLowerCase() !== "a") {
            result += matra;
          }
          pendingConsonant = null;
        } else {
          result += vowelMatch.value;
        }
        i += vowelMatch.key.length;
        continue;
      }
      flushPendingConsonant(true);
      result += text[i];
      i++;
    }
    flushPendingConsonant(true);
    return result;
  };
};
const iastVowelMapping = buildMapping([
  // Long vowels with diacritics
  { keys: ["ā", "aa"], value: { independent: "आ", matra: "ा" } },
  { keys: ["ī", "ii"], value: { independent: "ई", matra: "ी" } },
  { keys: ["ū", "uu"], value: { independent: "ऊ", matra: "ू" } },
  // Vocalic vowels
  { keys: ["ṛ", ".r", "r."], value: { independent: "ऋ", matra: "ृ" } },
  { keys: ["ṝ", ".rr", "rr."], value: { independent: "ॠ", matra: "ॄ" } },
  { keys: ["ḷ", ".l", "l."], value: { independent: "ऌ", matra: "ॢ" } },
  { keys: ["ḹ", ".ll", "ll."], value: { independent: "ॡ", matra: "ॣ" } },
  // Short vowels
  { keys: ["a"], value: { independent: "अ", matra: "", inherent: true } },
  { keys: ["i"], value: { independent: "इ", matra: "ि" } },
  { keys: ["u"], value: { independent: "उ", matra: "ु" } },
  // Diphthongs
  { keys: ["e"], value: { independent: "ए", matra: "े" } },
  { keys: ["ai"], value: { independent: "ऐ", matra: "ै" } },
  { keys: ["o"], value: { independent: "ओ", matra: "ो" } },
  { keys: ["au"], value: { independent: "औ", matra: "ौ" } }
]);
const iastConsonantMapping = buildMapping([
  // Velars (ka-varga)
  { keys: ["k"], value: "क" },
  { keys: ["kh"], value: "ख" },
  { keys: ["g"], value: "ग" },
  { keys: ["gh"], value: "घ" },
  { keys: ["ṅ", ".n"], value: "ङ" },
  // Palatals (cha-varga)
  { keys: ["c"], value: "च" },
  { keys: ["ch"], value: "छ" },
  { keys: ["j"], value: "ज" },
  { keys: ["jh"], value: "झ" },
  { keys: ["ñ", "~n"], value: "ञ" },
  // Retroflex (ta-varga)
  { keys: ["ṭ", ".t"], value: "ट" },
  { keys: ["ṭh", ".th"], value: "ठ" },
  { keys: ["ḍ", ".d"], value: "ड" },
  { keys: ["ḍh", ".dh"], value: "ढ" },
  { keys: ["ṇ", ".n"], value: "ण" },
  // Dentals (ta-varga)
  { keys: ["t"], value: "त" },
  { keys: ["th"], value: "थ" },
  { keys: ["d"], value: "द" },
  { keys: ["dh"], value: "ध" },
  { keys: ["n"], value: "न" },
  // Labials (pa-varga)
  { keys: ["p"], value: "प" },
  { keys: ["ph"], value: "फ" },
  { keys: ["b"], value: "ब" },
  { keys: ["bh"], value: "भ" },
  { keys: ["m"], value: "म" },
  // Semivowels (ya-varga)
  { keys: ["y"], value: "य" },
  { keys: ["r"], value: "र" },
  { keys: ["l"], value: "ल" },
  { keys: ["v"], value: "व" },
  // Sibilants (sha-varga)
  { keys: ["ś", ".s"], value: "श" },
  { keys: ["ṣ", "s."], value: "ष" },
  { keys: ["s"], value: "स" },
  { keys: ["h"], value: "ह" },
  // Compound consonants
  { keys: ["kṣ", "k.s"], value: "क्ष" },
  { keys: ["jñ", "j~n"], value: "ज्ञ" },
  { keys: ["tr"], value: "त्र" },
  { keys: ["śr", ".sr"], value: "श्र" }
]);
const iastDiacriticMapping = buildMapping([
  { keys: ["ṃ", ".m", "m."], value: "ं" },
  // Anusvara
  { keys: ["ḥ", ".h", "h."], value: "ः" },
  // Visarga
  { keys: ["m̐", "~m"], value: "ँ" }
  // Chandrabindu (rare in IAST)
]);
const createIASTMappings = () => ({
  vowels: iastVowelMapping,
  consonants: iastConsonantMapping,
  diacritics: iastDiacriticMapping
});
const IAST_TO_DEVANAGARI = {
  // Vowels
  "ā": "आ",
  "ī": "ई",
  "ū": "ऊ",
  "ṛ": "ऋ",
  "ṝ": "ॠ",
  "ḷ": "ऌ",
  "ḹ": "ॡ",
  "a": "अ",
  "i": "इ",
  "u": "उ",
  "e": "ए",
  "ai": "ऐ",
  "o": "ओ",
  "au": "औ",
  // Consonants
  "k": "क",
  "kh": "ख",
  "g": "ग",
  "gh": "घ",
  "ṅ": "ङ",
  "c": "च",
  "ch": "छ",
  "j": "ज",
  "jh": "झ",
  "ñ": "ञ",
  "ṭ": "ट",
  "ṭh": "ठ",
  "ḍ": "ड",
  "ḍh": "ढ",
  "ṇ": "ण",
  "t": "त",
  "th": "थ",
  "d": "द",
  "dh": "ध",
  "n": "न",
  "p": "प",
  "ph": "फ",
  "b": "ब",
  "bh": "भ",
  "m": "म",
  "y": "य",
  "r": "र",
  "l": "ल",
  "v": "व",
  "ś": "श",
  "ṣ": "ष",
  "s": "स",
  "h": "ह",
  // Diacritics
  "ṃ": "ं",
  "ḥ": "ः",
  "m̐": "ँ",
  // Compounds
  "kṣ": "क्ष",
  "jñ": "ज्ञ",
  "tr": "त्र",
  "śr": "श्र"
};
const DEVANAGARI_TO_IAST = {
  // Vowels
  "आ": "ā",
  "ई": "ī",
  "ऊ": "ū",
  "ऋ": "ṛ",
  "ॠ": "ṝ",
  "ऌ": "ḷ",
  "ॡ": "ḹ",
  "अ": "a",
  "इ": "i",
  "उ": "u",
  "ए": "e",
  "ऐ": "ai",
  "ओ": "o",
  "औ": "au",
  // Vowel matras
  "ा": "ā",
  "ि": "i",
  "ी": "ī",
  "ु": "u",
  "ू": "ū",
  "ृ": "ṛ",
  "ॄ": "ṝ",
  "ॢ": "ḷ",
  "ॣ": "ḹ",
  "े": "e",
  "ै": "ai",
  "ो": "o",
  "ौ": "au",
  // Consonants
  "क": "ka",
  "ख": "kha",
  "ग": "ga",
  "घ": "gha",
  "ङ": "ṅa",
  "च": "ca",
  "छ": "cha",
  "ज": "ja",
  "झ": "jha",
  "ञ": "ña",
  "ट": "ṭa",
  "ठ": "ṭha",
  "ड": "ḍa",
  "ढ": "ḍha",
  "ण": "ṇa",
  "त": "ta",
  "थ": "tha",
  "द": "da",
  "ध": "dha",
  "न": "na",
  "प": "pa",
  "फ": "pha",
  "ब": "ba",
  "भ": "bha",
  "म": "ma",
  "य": "ya",
  "र": "ra",
  "ल": "la",
  "व": "va",
  "श": "śa",
  "ष": "ṣa",
  "स": "sa",
  "ह": "ha",
  // Diacritics
  "ं": "ṃ",
  "ः": "ḥ",
  "ँ": "m̐",
  "्": "",
  // Halant
  // Compounds
  "क्ष": "kṣa",
  "ज्ञ": "jña",
  "त्र": "tra",
  "श्र": "śra"
};
const iastToDevanagari = (text) => {
  const HALANT2 = "्";
  let result = "";
  let i = 0;
  let pendingConsonant = null;
  const vowelMatras = {
    "ā": "ा",
    "aa": "ा",
    "i": "ि",
    "ī": "ी",
    "ii": "ी",
    "u": "ु",
    "ū": "ू",
    "uu": "ू",
    "ṛ": "ृ",
    ".r": "ृ",
    "ṝ": "ॄ",
    ".rr": "ॄ",
    "ḷ": "ॢ",
    ".l": "ॢ",
    "ḹ": "ॣ",
    ".ll": "ॣ",
    "e": "े",
    "ai": "ै",
    "o": "ो",
    "au": "ौ"
  };
  const independentVowels = {
    "a": "अ",
    "ā": "आ",
    "aa": "आ",
    "i": "इ",
    "ī": "ई",
    "ii": "ई",
    "u": "उ",
    "ū": "ऊ",
    "uu": "ऊ",
    "ṛ": "ऋ",
    ".r": "ऋ",
    "ṝ": "ॠ",
    ".rr": "ॠ",
    "ḷ": "ऌ",
    ".l": "ऌ",
    "ḹ": "ॡ",
    ".ll": "ॡ",
    "e": "ए",
    "ai": "ऐ",
    "o": "ओ",
    "au": "औ"
  };
  const consonants = {
    "k": "क",
    "kh": "ख",
    "g": "ग",
    "gh": "घ",
    "ṅ": "ङ",
    ".n": "ङ",
    "c": "च",
    "ch": "छ",
    "j": "ज",
    "jh": "झ",
    "ñ": "ञ",
    "~n": "ञ",
    "ṭ": "ट",
    ".t": "ट",
    "ṭh": "ठ",
    ".th": "ठ",
    "ḍ": "ड",
    ".d": "ड",
    "ḍh": "ढ",
    ".dh": "ढ",
    "ṇ": "ण",
    "t": "त",
    "th": "थ",
    "d": "द",
    "dh": "ध",
    "n": "न",
    "p": "प",
    "ph": "फ",
    "b": "ब",
    "bh": "भ",
    "m": "म",
    "y": "य",
    "r": "र",
    "l": "ल",
    "v": "व",
    "w": "व",
    "ś": "श",
    ".s": "श",
    "ṣ": "ष",
    "s.": "ष",
    "s": "स",
    "h": "ह"
  };
  const diacritics = {
    "ṃ": "ं",
    ".m": "ं",
    "m.": "ं",
    "ḥ": "ः",
    ".h": "ः",
    "h.": "ः",
    "m̐": "ँ",
    "~m": "ँ"
  };
  const flushPendingConsonant = (addInherentA = true) => {
    if (pendingConsonant) {
      result += pendingConsonant;
      if (!addInherentA) {
        result += HALANT2;
      }
      pendingConsonant = null;
    }
  };
  const tryMatch = (map, maxLen = 3) => {
    for (let len = maxLen; len >= 1; len--) {
      const substr = text.slice(i, i + len);
      if (map[substr]) {
        return { key: substr, value: map[substr] };
      }
    }
    return null;
  };
  while (i < text.length) {
    const diacriticMatch = tryMatch(diacritics, 3);
    if (diacriticMatch) {
      flushPendingConsonant(true);
      result += diacriticMatch.value;
      i += diacriticMatch.key.length;
      continue;
    }
    const consonantMatch = tryMatch(consonants, 3);
    if (consonantMatch) {
      if (pendingConsonant) {
        result += pendingConsonant + HALANT2;
      }
      pendingConsonant = consonantMatch.value;
      i += consonantMatch.key.length;
      continue;
    }
    const vowelMatch = tryMatch(independentVowels, 3);
    if (vowelMatch) {
      if (pendingConsonant) {
        result += pendingConsonant;
        const matra = vowelMatras[vowelMatch.key];
        if (matra && vowelMatch.key !== "a") {
          result += matra;
        }
        pendingConsonant = null;
      } else {
        result += vowelMatch.value;
      }
      i += vowelMatch.key.length;
      continue;
    }
    flushPendingConsonant(true);
    result += text[i];
    i++;
  }
  flushPendingConsonant(true);
  return result;
};
const devanagariToIAST = (text) => {
  let result = "";
  let i = 0;
  while (i < text.length) {
    let matched = false;
    for (let len = 3; len >= 1; len--) {
      const substr = text.slice(i, i + len);
      if (DEVANAGARI_TO_IAST[substr]) {
        result += DEVANAGARI_TO_IAST[substr];
        i += len;
        matched = true;
        break;
      }
    }
    if (!matched) {
      result += text[i];
      i++;
    }
  }
  return result;
};
const iso15919VowelMapping = buildMapping([
  // Long vowels with macron
  { keys: ["ā", "aa"], value: { independent: "आ", matra: "ा" } },
  { keys: ["ī", "ii"], value: { independent: "ई", matra: "ी" } },
  { keys: ["ū", "uu"], value: { independent: "ऊ", matra: "ू" } },
  // Vocalic vowels
  { keys: ["r̥", ".r", "r."], value: { independent: "ऋ", matra: "ृ" } },
  { keys: ["r̥̄", ".rr", "rr."], value: { independent: "ॠ", matra: "ॄ" } },
  { keys: ["l̥", ".l", "l."], value: { independent: "ऌ", matra: "ॢ" } },
  { keys: ["l̥̄", ".ll", "ll."], value: { independent: "ॡ", matra: "ॣ" } },
  // Short vowels
  { keys: ["a"], value: { independent: "अ", matra: "", inherent: true } },
  { keys: ["i"], value: { independent: "इ", matra: "ि" } },
  { keys: ["u"], value: { independent: "उ", matra: "ु" } },
  // Diphthongs (no diacritics - key difference from IAST)
  { keys: ["e"], value: { independent: "ए", matra: "े" } },
  { keys: ["ai"], value: { independent: "ऐ", matra: "ै" } },
  { keys: ["o"], value: { independent: "ओ", matra: "ो" } },
  { keys: ["au"], value: { independent: "औ", matra: "ौ" } }
]);
const iso15919ConsonantMapping = buildMapping([
  // Velars
  { keys: ["k"], value: "क" },
  { keys: ["kh"], value: "ख" },
  { keys: ["g"], value: "ग" },
  { keys: ["gh"], value: "घ" },
  { keys: ["ṅ", ".n"], value: "ङ" },
  // Palatals
  { keys: ["c"], value: "च" },
  { keys: ["ch"], value: "छ" },
  { keys: ["j"], value: "ज" },
  { keys: ["jh"], value: "झ" },
  { keys: ["ñ", "~n"], value: "ञ" },
  // Retroflex
  { keys: ["ṭ", ".t"], value: "ट" },
  { keys: ["ṭh", ".th"], value: "ठ" },
  { keys: ["ḍ", ".d"], value: "ड" },
  { keys: ["ḍh", ".dh"], value: "ढ" },
  { keys: ["ṇ", ".n"], value: "ण" },
  // Dentals
  { keys: ["t"], value: "त" },
  { keys: ["th"], value: "थ" },
  { keys: ["d"], value: "द" },
  { keys: ["dh"], value: "ध" },
  { keys: ["n"], value: "न" },
  // Labials
  { keys: ["p"], value: "प" },
  { keys: ["ph"], value: "फ" },
  { keys: ["b"], value: "ब" },
  { keys: ["bh"], value: "भ" },
  { keys: ["m"], value: "म" },
  // Semivowels
  { keys: ["y"], value: "य" },
  { keys: ["r"], value: "र" },
  { keys: ["l"], value: "ल" },
  { keys: ["v"], value: "व" },
  // Sibilants
  { keys: ["ś", ".s"], value: "श" },
  { keys: ["ṣ", "s."], value: "ष" },
  { keys: ["s"], value: "स" },
  { keys: ["h"], value: "ह" },
  // Compounds
  { keys: ["kṣ", "k.s"], value: "क्ष" },
  { keys: ["jñ", "j~n"], value: "ज्ञ" }
]);
const iso15919DiacriticMapping = buildMapping([
  { keys: ["ṁ", ".m", "m."], value: "ं" },
  // Anusvara (different from IAST ṃ)
  { keys: ["ḥ", ".h", "h."], value: "ः" },
  // Visarga
  { keys: ["m̐", "~m"], value: "ँ" }
  // Chandrabindu
]);
const createISO15919Mappings = () => ({
  vowels: iso15919VowelMapping,
  consonants: iso15919ConsonantMapping,
  diacritics: iso15919DiacriticMapping
});
const ISO15919_TO_DEVANAGARI = {
  // Vowels
  "ā": "आ",
  "ī": "ई",
  "ū": "ऊ",
  "r̥": "ऋ",
  "r̥̄": "ॠ",
  "l̥": "ऌ",
  "l̥̄": "ॡ",
  "a": "अ",
  "i": "इ",
  "u": "उ",
  "e": "ए",
  "ai": "ऐ",
  "o": "ओ",
  "au": "औ",
  // Consonants (same as IAST)
  "k": "क",
  "kh": "ख",
  "g": "ग",
  "gh": "घ",
  "ṅ": "ङ",
  "c": "च",
  "ch": "छ",
  "j": "ज",
  "jh": "झ",
  "ñ": "ञ",
  "ṭ": "ट",
  "ṭh": "ठ",
  "ḍ": "ड",
  "ḍh": "ढ",
  "ṇ": "ण",
  "t": "त",
  "th": "थ",
  "d": "द",
  "dh": "ध",
  "n": "न",
  "p": "प",
  "ph": "फ",
  "b": "ब",
  "bh": "भ",
  "m": "म",
  "y": "य",
  "r": "र",
  "l": "ल",
  "v": "व",
  "ś": "श",
  "ṣ": "ष",
  "s": "स",
  "h": "ह",
  // Diacritics
  "ṁ": "ं",
  "ḥ": "ः",
  "m̐": "ँ"
};
const iso15919ToDevanagari = createSchemeConverter({
  consonants: {
    "k": "क",
    "kh": "ख",
    "g": "ग",
    "gh": "घ",
    "ṅ": "ङ",
    ".n": "ङ",
    "c": "च",
    "ch": "छ",
    "j": "ज",
    "jh": "झ",
    "ñ": "ञ",
    "~n": "ञ",
    "ṭ": "ट",
    ".t": "ट",
    "ṭh": "ठ",
    ".th": "ठ",
    "ḍ": "ड",
    ".d": "ड",
    "ḍh": "ढ",
    ".dh": "ढ",
    "ṇ": "ण",
    "t": "त",
    "th": "थ",
    "d": "द",
    "dh": "ध",
    "n": "न",
    "p": "प",
    "ph": "फ",
    "b": "ब",
    "bh": "भ",
    "m": "म",
    "y": "य",
    "r": "र",
    "l": "ल",
    "v": "व",
    "w": "व",
    "ś": "श",
    ".s": "श",
    "ṣ": "ष",
    "s.": "ष",
    "s": "स",
    "h": "ह"
  },
  vowelMatras: {
    "ā": "ा",
    "aa": "ा",
    "i": "ि",
    "ī": "ी",
    "ii": "ी",
    "u": "ु",
    "ū": "ू",
    "uu": "ू",
    "r̥": "ृ",
    ".r": "ृ",
    "r̥̄": "ॄ",
    ".rr": "ॄ",
    "l̥": "ॢ",
    ".l": "ॢ",
    "l̥̄": "ॣ",
    ".ll": "ॣ",
    "e": "े",
    "ai": "ै",
    "o": "ो",
    "au": "ौ"
  },
  independentVowels: {
    "a": "अ",
    "ā": "आ",
    "aa": "आ",
    "i": "इ",
    "ī": "ई",
    "ii": "ई",
    "u": "उ",
    "ū": "ऊ",
    "uu": "ऊ",
    "r̥": "ऋ",
    ".r": "ऋ",
    "r̥̄": "ॠ",
    ".rr": "ॠ",
    "l̥": "ऌ",
    ".l": "ऌ",
    "l̥̄": "ॡ",
    ".ll": "ॡ",
    "e": "ए",
    "ai": "ऐ",
    "o": "ओ",
    "au": "औ"
  },
  diacritics: {
    "ṁ": "ं",
    ".m": "ं",
    "m.": "ं",
    "ḥ": "ः",
    ".h": "ः",
    "h.": "ः",
    "m̐": "ँ",
    "~m": "ँ"
  },
  caseSensitive: false
});
const harvardKyotoVowelMapping = buildMapping([
  // Long vowels (uppercase)
  { keys: ["A"], value: { independent: "आ", matra: "ा" }, caseSensitive: true },
  { keys: ["I"], value: { independent: "ई", matra: "ी" }, caseSensitive: true },
  { keys: ["U"], value: { independent: "ऊ", matra: "ू" }, caseSensitive: true },
  // Vocalic vowels
  { keys: ["R"], value: { independent: "ऋ", matra: "ृ" }, caseSensitive: true },
  { keys: ["RR"], value: { independent: "ॠ", matra: "ॄ" }, caseSensitive: true },
  { keys: ["lR"], value: { independent: "ऌ", matra: "ॢ" }, caseSensitive: true },
  { keys: ["lRR"], value: { independent: "ॡ", matra: "ॣ" }, caseSensitive: true },
  // Short vowels (lowercase)
  { keys: ["a"], value: { independent: "अ", matra: "", inherent: true } },
  { keys: ["i"], value: { independent: "इ", matra: "ि" } },
  { keys: ["u"], value: { independent: "उ", matra: "ु" } },
  // Diphthongs
  { keys: ["e"], value: { independent: "ए", matra: "े" } },
  { keys: ["ai"], value: { independent: "ऐ", matra: "ै" } },
  { keys: ["o"], value: { independent: "ओ", matra: "ो" } },
  { keys: ["au"], value: { independent: "औ", matra: "ौ" } }
]);
const harvardKyotoConsonantMapping = buildMapping([
  // Velars
  { keys: ["k"], value: "क" },
  { keys: ["kh"], value: "ख" },
  { keys: ["g"], value: "ग" },
  { keys: ["gh"], value: "घ" },
  { keys: ["G"], value: "ङ", caseSensitive: true },
  // velar nasal
  // Palatals
  { keys: ["c"], value: "च" },
  { keys: ["ch"], value: "छ" },
  { keys: ["j"], value: "ज" },
  { keys: ["jh"], value: "झ" },
  { keys: ["J"], value: "ञ", caseSensitive: true },
  // palatal nasal
  // Retroflex (uppercase)
  { keys: ["T"], value: "ट", caseSensitive: true },
  { keys: ["Th"], value: "ठ", caseSensitive: true },
  { keys: ["D"], value: "ड", caseSensitive: true },
  { keys: ["Dh"], value: "ढ", caseSensitive: true },
  { keys: ["N"], value: "ण", caseSensitive: true },
  // retroflex nasal
  // Dentals (lowercase)
  { keys: ["t"], value: "त" },
  { keys: ["th"], value: "थ" },
  { keys: ["d"], value: "द" },
  { keys: ["dh"], value: "ध" },
  { keys: ["n"], value: "न" },
  // Labials
  { keys: ["p"], value: "प" },
  { keys: ["ph"], value: "फ" },
  { keys: ["b"], value: "ब" },
  { keys: ["bh"], value: "भ" },
  { keys: ["m"], value: "म" },
  // Semivowels
  { keys: ["y"], value: "य" },
  { keys: ["r"], value: "र" },
  { keys: ["l"], value: "ल" },
  { keys: ["v"], value: "व" },
  // Sibilants
  { keys: ["z"], value: "श", caseSensitive: true },
  // palatal (lowercase z)
  { keys: ["S"], value: "ष", caseSensitive: true },
  // retroflex (uppercase)
  { keys: ["s"], value: "स" },
  // dental
  { keys: ["h"], value: "ह" },
  // Compounds
  { keys: ["kS"], value: "क्ष", caseSensitive: true },
  { keys: ["jJ"], value: "ज्ञ", caseSensitive: true }
]);
const harvardKyotoDiacriticMapping = buildMapping([
  { keys: ["M"], value: "ं", caseSensitive: true },
  // Anusvara (uppercase)
  { keys: ["H"], value: "ः", caseSensitive: true },
  // Visarga (uppercase)
  { keys: ["~M"], value: "ँ" }
  // Chandrabindu
]);
const createHarvardKyotoMappings = () => ({
  vowels: harvardKyotoVowelMapping,
  consonants: harvardKyotoConsonantMapping,
  diacritics: harvardKyotoDiacriticMapping
});
const HARVARD_KYOTO_TO_DEVANAGARI = {
  // Vowels (case-sensitive)
  "A": "आ",
  "I": "ई",
  "U": "ऊ",
  "R": "ऋ",
  "RR": "ॠ",
  "lR": "ऌ",
  "lRR": "ॡ",
  "a": "अ",
  "i": "इ",
  "u": "उ",
  "e": "ए",
  "ai": "ऐ",
  "o": "ओ",
  "au": "औ",
  // Consonants
  "k": "क",
  "kh": "ख",
  "g": "ग",
  "gh": "घ",
  "G": "ङ",
  "c": "च",
  "ch": "छ",
  "j": "ज",
  "jh": "झ",
  "J": "ञ",
  "T": "ट",
  "Th": "ठ",
  "D": "ड",
  "Dh": "ढ",
  "N": "ण",
  "t": "त",
  "th": "थ",
  "d": "द",
  "dh": "ध",
  "n": "न",
  "p": "प",
  "ph": "फ",
  "b": "ब",
  "bh": "भ",
  "m": "म",
  "y": "य",
  "r": "र",
  "l": "ल",
  "v": "व",
  "z": "श",
  "S": "ष",
  "s": "स",
  "h": "ह",
  // Diacritics
  "M": "ं",
  "H": "ः",
  "~M": "ँ",
  // Compounds
  "kS": "क्ष",
  "jJ": "ज्ञ"
};
const harvardKyotoToDevanagari = createSchemeConverter({
  consonants: {
    "k": "क",
    "kh": "ख",
    "g": "ग",
    "gh": "घ",
    "G": "ङ",
    "c": "च",
    "ch": "छ",
    "j": "ज",
    "jh": "झ",
    "J": "ञ",
    "T": "ट",
    "Th": "ठ",
    "D": "ड",
    "Dh": "ढ",
    "N": "ण",
    "t": "त",
    "th": "थ",
    "d": "द",
    "dh": "ध",
    "n": "न",
    "p": "प",
    "ph": "फ",
    "b": "ब",
    "bh": "भ",
    "m": "म",
    "y": "य",
    "r": "र",
    "l": "ल",
    "v": "व",
    "z": "श",
    "S": "ष",
    "s": "स",
    "h": "ह"
  },
  vowelMatras: {
    "A": "ा",
    "i": "ि",
    "I": "ी",
    "u": "ु",
    "U": "ू",
    "R": "ृ",
    "RR": "ॄ",
    "lR": "ॢ",
    "lRR": "ॣ",
    "e": "े",
    "ai": "ै",
    "o": "ो",
    "au": "ौ"
  },
  independentVowels: {
    "a": "अ",
    "A": "आ",
    "i": "इ",
    "I": "ई",
    "u": "उ",
    "U": "ऊ",
    "R": "ऋ",
    "RR": "ॠ",
    "lR": "ऌ",
    "lRR": "ॡ",
    "e": "ए",
    "ai": "ऐ",
    "o": "ओ",
    "au": "औ"
  },
  diacritics: {
    "M": "ं",
    "H": "ः",
    "~M": "ँ"
  },
  caseSensitive: true
});
const velthuisVowelMapping = buildMapping([
  // Long vowels with quote
  { keys: ['"a'], value: { independent: "आ", matra: "ा" } },
  { keys: ['"i'], value: { independent: "ई", matra: "ी" } },
  { keys: ['"u'], value: { independent: "ऊ", matra: "ू" } },
  // Vocalic vowels (dot prefix)
  { keys: [".r"], value: { independent: "ऋ", matra: "ृ" } },
  { keys: [".rr"], value: { independent: "ॠ", matra: "ॄ" } },
  { keys: [".l"], value: { independent: "ऌ", matra: "ॢ" } },
  { keys: [".ll"], value: { independent: "ॡ", matra: "ॣ" } },
  // Short vowels
  { keys: ["a"], value: { independent: "अ", matra: "", inherent: true } },
  { keys: ["i"], value: { independent: "इ", matra: "ि" } },
  { keys: ["u"], value: { independent: "उ", matra: "ु" } },
  // Diphthongs
  { keys: ["e"], value: { independent: "ए", matra: "े" } },
  { keys: ["ai"], value: { independent: "ऐ", matra: "ै" } },
  { keys: ["o"], value: { independent: "ओ", matra: "ो" } },
  { keys: ["au"], value: { independent: "औ", matra: "ौ" } }
]);
const velthuisConsonantMapping = buildMapping([
  // Velars
  { keys: ["k"], value: "क" },
  { keys: ["kh"], value: "ख" },
  { keys: ["g"], value: "ग" },
  { keys: ["gh"], value: "घ" },
  { keys: ['"n'], value: "ङ" },
  // velar nasal (quote)
  // Palatals
  { keys: ["c"], value: "च" },
  { keys: ["ch"], value: "छ" },
  { keys: ["j"], value: "ज" },
  { keys: ["jh"], value: "झ" },
  { keys: ["~n"], value: "ञ" },
  // palatal nasal (tilde)
  // Retroflex (dot prefix)
  { keys: [".t"], value: "ट" },
  { keys: [".th"], value: "ठ" },
  { keys: [".d"], value: "ड" },
  { keys: [".dh"], value: "ढ" },
  { keys: [".n"], value: "ण" },
  // Dentals
  { keys: ["t"], value: "त" },
  { keys: ["th"], value: "थ" },
  { keys: ["d"], value: "द" },
  { keys: ["dh"], value: "ध" },
  { keys: ["n"], value: "न" },
  // Labials
  { keys: ["p"], value: "प" },
  { keys: ["ph"], value: "फ" },
  { keys: ["b"], value: "ब" },
  { keys: ["bh"], value: "भ" },
  { keys: ["m"], value: "म" },
  // Semivowels
  { keys: ["y"], value: "य" },
  { keys: ["r"], value: "र" },
  { keys: ["l"], value: "ल" },
  { keys: ["v"], value: "व" },
  // Sibilants
  { keys: ['"s'], value: "श" },
  // palatal (quote)
  { keys: [".s"], value: "ष" },
  // retroflex (dot)
  { keys: ["s"], value: "स" },
  // dental
  { keys: ["h"], value: "ह" },
  // Compounds
  { keys: ["k.s"], value: "क्ष" },
  { keys: ["j~n"], value: "ज्ञ" }
]);
const velthuisDiacriticMapping = buildMapping([
  { keys: [".m"], value: "ं" },
  // Anusvara
  { keys: [".h"], value: "ः" },
  // Visarga
  { keys: [".n"], value: "ँ" }
  // Chandrabindu (alternative)
]);
const createVelthuisMappings = () => ({
  vowels: velthuisVowelMapping,
  consonants: velthuisConsonantMapping,
  diacritics: velthuisDiacriticMapping
});
const VELTHUIS_TO_DEVANAGARI = {
  // Vowels
  '"a': "आ",
  '"i': "ई",
  '"u': "ऊ",
  ".r": "ऋ",
  ".rr": "ॠ",
  ".l": "ऌ",
  ".ll": "ॡ",
  "a": "अ",
  "i": "इ",
  "u": "उ",
  "e": "ए",
  "ai": "ऐ",
  "o": "ओ",
  "au": "औ",
  // Consonants
  "k": "क",
  "kh": "ख",
  "g": "ग",
  "gh": "घ",
  '"n': "ङ",
  "c": "च",
  "ch": "छ",
  "j": "ज",
  "jh": "झ",
  "~n": "ञ",
  ".t": "ट",
  ".th": "ठ",
  ".d": "ड",
  ".dh": "ढ",
  ".n": "ण",
  "t": "त",
  "th": "थ",
  "d": "द",
  "dh": "ध",
  "n": "न",
  "p": "प",
  "ph": "फ",
  "b": "ब",
  "bh": "भ",
  "m": "म",
  "y": "य",
  "r": "र",
  "l": "ल",
  "v": "व",
  '"s': "श",
  ".s": "ष",
  "s": "स",
  "h": "ह",
  // Diacritics
  ".m": "ं",
  ".h": "ः",
  // Compounds
  "k.s": "क्ष",
  "j~n": "ज्ञ"
};
const velthuisToDevanagari = createSchemeConverter({
  consonants: {
    "k": "क",
    "kh": "ख",
    "g": "ग",
    "gh": "घ",
    '"n': "ङ",
    "c": "च",
    "ch": "छ",
    "j": "ज",
    "jh": "झ",
    "~n": "ञ",
    ".t": "ट",
    ".th": "ठ",
    ".d": "ड",
    ".dh": "ढ",
    ".n": "ण",
    "t": "त",
    "th": "थ",
    "d": "द",
    "dh": "ध",
    "n": "न",
    "p": "प",
    "ph": "फ",
    "b": "ब",
    "bh": "भ",
    "m": "म",
    "y": "य",
    "r": "र",
    "l": "ल",
    "v": "व",
    '"s': "श",
    ".s": "ष",
    "s": "स",
    "h": "ह"
  },
  vowelMatras: {
    '"a': "ा",
    "i": "ि",
    '"i': "ी",
    "u": "ु",
    '"u': "ू",
    ".r": "ृ",
    ".rr": "ॄ",
    ".l": "ॢ",
    ".ll": "ॣ",
    "e": "े",
    "ai": "ै",
    "o": "ो",
    "au": "ौ"
  },
  independentVowels: {
    "a": "अ",
    '"a': "आ",
    "i": "इ",
    '"i': "ई",
    "u": "उ",
    '"u': "ऊ",
    ".r": "ऋ",
    ".rr": "ॠ",
    ".l": "ऌ",
    ".ll": "ॡ",
    "e": "ए",
    "ai": "ऐ",
    "o": "ओ",
    "au": "औ"
  },
  diacritics: {
    ".m": "ं",
    ".h": "ः",
    "~m": "ँ"
  },
  caseSensitive: false
});
const slp1VowelMapping = buildMapping([
  // Long vowels
  { keys: ["A"], value: { independent: "आ", matra: "ा" }, caseSensitive: true },
  { keys: ["I"], value: { independent: "ई", matra: "ी" }, caseSensitive: true },
  { keys: ["U"], value: { independent: "ऊ", matra: "ू" }, caseSensitive: true },
  // Vocalic vowels
  { keys: ["f"], value: { independent: "ऋ", matra: "ृ" } },
  { keys: ["F"], value: { independent: "ॠ", matra: "ॄ" }, caseSensitive: true },
  { keys: ["x"], value: { independent: "ऌ", matra: "ॢ" } },
  { keys: ["X"], value: { independent: "ॡ", matra: "ॣ" }, caseSensitive: true },
  // Short vowels
  { keys: ["a"], value: { independent: "अ", matra: "", inherent: true } },
  { keys: ["i"], value: { independent: "इ", matra: "ि" } },
  { keys: ["u"], value: { independent: "उ", matra: "ु" } },
  // Diphthongs
  { keys: ["e"], value: { independent: "ए", matra: "े" } },
  { keys: ["E"], value: { independent: "ऐ", matra: "ै" }, caseSensitive: true },
  { keys: ["o"], value: { independent: "ओ", matra: "ो" } },
  { keys: ["O"], value: { independent: "औ", matra: "ौ" }, caseSensitive: true }
]);
const slp1ConsonantMapping = buildMapping([
  // Velars
  { keys: ["k"], value: "क" },
  { keys: ["K"], value: "ख", caseSensitive: true },
  { keys: ["g"], value: "ग" },
  { keys: ["G"], value: "घ", caseSensitive: true },
  { keys: ["N"], value: "ङ", caseSensitive: true },
  // Palatals
  { keys: ["c"], value: "च" },
  { keys: ["C"], value: "छ", caseSensitive: true },
  { keys: ["j"], value: "ज" },
  { keys: ["J"], value: "झ", caseSensitive: true },
  { keys: ["Y"], value: "ञ", caseSensitive: true },
  // Retroflex
  { keys: ["w"], value: "ट" },
  { keys: ["W"], value: "ठ", caseSensitive: true },
  { keys: ["q"], value: "ड" },
  { keys: ["Q"], value: "ढ", caseSensitive: true },
  { keys: ["R"], value: "ण", caseSensitive: true },
  // Dentals
  { keys: ["t"], value: "त" },
  { keys: ["T"], value: "थ", caseSensitive: true },
  { keys: ["d"], value: "द" },
  { keys: ["D"], value: "ध", caseSensitive: true },
  { keys: ["n"], value: "न" },
  // Labials
  { keys: ["p"], value: "प" },
  { keys: ["P"], value: "फ", caseSensitive: true },
  { keys: ["b"], value: "ब" },
  { keys: ["B"], value: "भ", caseSensitive: true },
  { keys: ["m"], value: "म" },
  // Semivowels
  { keys: ["y"], value: "य" },
  { keys: ["r"], value: "र" },
  { keys: ["l"], value: "ल" },
  { keys: ["v"], value: "व" },
  // Sibilants
  { keys: ["S"], value: "श", caseSensitive: true },
  { keys: ["z"], value: "ष" },
  { keys: ["s"], value: "स" },
  { keys: ["h"], value: "ह" }
]);
const slp1DiacriticMapping = buildMapping([
  { keys: ["M"], value: "ं", caseSensitive: true },
  // Anusvara
  { keys: ["H"], value: "ः", caseSensitive: true },
  // Visarga
  { keys: ["~"], value: "ँ" }
  // Chandrabindu
]);
const createSLP1Mappings = () => ({
  vowels: slp1VowelMapping,
  consonants: slp1ConsonantMapping,
  diacritics: slp1DiacriticMapping
});
const SLP1_TO_DEVANAGARI = {
  // Vowels
  "A": "आ",
  "I": "ई",
  "U": "ऊ",
  "f": "ऋ",
  "F": "ॠ",
  "x": "ऌ",
  "X": "ॡ",
  "a": "अ",
  "i": "इ",
  "u": "उ",
  "e": "ए",
  "E": "ऐ",
  "o": "ओ",
  "O": "औ",
  // Consonants
  "k": "क",
  "K": "ख",
  "g": "ग",
  "G": "घ",
  "N": "ङ",
  "c": "च",
  "C": "छ",
  "j": "ज",
  "J": "झ",
  "Y": "ञ",
  "w": "ट",
  "W": "ठ",
  "q": "ड",
  "Q": "ढ",
  "R": "ण",
  "t": "त",
  "T": "थ",
  "d": "द",
  "D": "ध",
  "n": "न",
  "p": "प",
  "P": "फ",
  "b": "ब",
  "B": "भ",
  "m": "म",
  "y": "य",
  "r": "र",
  "l": "ल",
  "v": "व",
  "S": "श",
  "z": "ष",
  "s": "स",
  "h": "ह",
  // Diacritics
  "M": "ं",
  "H": "ः",
  "~": "ँ"
};
const slp1ToDevanagari = createSchemeConverter({
  consonants: {
    "k": "क",
    "K": "ख",
    "g": "ग",
    "G": "घ",
    "N": "ङ",
    "c": "च",
    "C": "छ",
    "j": "ज",
    "J": "झ",
    "Y": "ञ",
    "w": "ट",
    "W": "ठ",
    "q": "ड",
    "Q": "ढ",
    "R": "ण",
    "t": "त",
    "T": "थ",
    "d": "द",
    "D": "ध",
    "n": "न",
    "p": "प",
    "P": "फ",
    "b": "ब",
    "B": "भ",
    "m": "म",
    "y": "य",
    "r": "र",
    "l": "ल",
    "v": "व",
    "S": "श",
    "z": "ष",
    "s": "स",
    "h": "ह"
  },
  vowelMatras: {
    "A": "ा",
    "i": "ि",
    "I": "ी",
    "u": "ु",
    "U": "ू",
    "f": "ृ",
    "F": "ॄ",
    "x": "ॢ",
    "X": "ॣ",
    "e": "े",
    "E": "ै",
    "o": "ो",
    "O": "ौ"
  },
  independentVowels: {
    "a": "अ",
    "A": "आ",
    "i": "इ",
    "I": "ई",
    "u": "उ",
    "U": "ऊ",
    "f": "ऋ",
    "F": "ॠ",
    "x": "ऌ",
    "X": "ॡ",
    "e": "ए",
    "E": "ऐ",
    "o": "ओ",
    "O": "औ"
  },
  diacritics: {
    "M": "ं",
    "H": "ः",
    "~": "ँ"
  },
  caseSensitive: true
});
const SCHEMES = [
  {
    id: "default",
    name: "Default (Nepali)",
    description: "Simple romanization optimized for Nepali typing",
    supportsUnicode: false,
    supportsAscii: true,
    caseSensitive: false,
    commonUse: "General typing"
  },
  {
    id: "iast",
    name: "IAST",
    description: "International Alphabet of Sanskrit Transliteration with diacritical marks",
    supportsUnicode: true,
    supportsAscii: true,
    caseSensitive: false,
    commonUse: "Academic publications, scholarly works"
  },
  {
    id: "iso15919",
    name: "ISO 15919",
    description: "International standard for transliteration of Devanagari and related scripts",
    supportsUnicode: true,
    supportsAscii: true,
    caseSensitive: false,
    commonUse: "International standards, official documents"
  },
  {
    id: "harvard-kyoto",
    name: "Harvard-Kyoto",
    description: "ASCII-only, case-sensitive notation for academic texts and LaTeX",
    supportsUnicode: false,
    supportsAscii: true,
    caseSensitive: true,
    commonUse: "LaTeX documents, plain text databases"
  },
  {
    id: "velthuis",
    name: "Velthuis",
    description: "LaTeX-friendly notation using dot and quote prefixes",
    supportsUnicode: false,
    supportsAscii: true,
    caseSensitive: false,
    commonUse: "LaTeX typesetting"
  },
  {
    id: "slp1",
    name: "SLP1",
    description: "Sanskrit Library Phonetic Basic - one ASCII char per Devanagari char",
    supportsUnicode: false,
    supportsAscii: true,
    caseSensitive: true,
    commonUse: "Computational linguistics, text processing"
  }
];
const getSchemeInfo = (schemeId) => {
  return SCHEMES.find((s) => s.id === schemeId);
};
const CHARACTER_CATEGORIES = [
  {
    id: "vowels",
    name: "Vowels (स्वर)",
    description: "Independent vowel characters",
    characters: [
      { char: "अ", name: "a", romanization: "a", unicode: "U+0905" },
      { char: "आ", name: "ā", romanization: "aa/ā", unicode: "U+0906" },
      { char: "इ", name: "i", romanization: "i", unicode: "U+0907" },
      { char: "ई", name: "ī", romanization: "ii/ī", unicode: "U+0908" },
      { char: "उ", name: "u", romanization: "u", unicode: "U+0909" },
      { char: "ऊ", name: "ū", romanization: "uu/ū", unicode: "U+090A" },
      { char: "ऋ", name: "ṛ", romanization: "ri/ṛ", unicode: "U+090B" },
      { char: "ॠ", name: "ṝ", romanization: "rri/ṝ", unicode: "U+0960" },
      { char: "ऌ", name: "ḷ", romanization: "lri/ḷ", unicode: "U+090C" },
      { char: "ॡ", name: "ḹ", romanization: "lree/ḹ", unicode: "U+0961" },
      { char: "ए", name: "e", romanization: "e", unicode: "U+090F" },
      { char: "ऐ", name: "ai", romanization: "ai", unicode: "U+0910" },
      { char: "ओ", name: "o", romanization: "o", unicode: "U+0913" },
      { char: "औ", name: "au", romanization: "au", unicode: "U+0914" },
      { char: "ऍ", name: "ê", romanization: "e^/eN", unicode: "U+090D" }
    ]
  },
  {
    id: "consonants",
    name: "Consonants (व्यञ्जन)",
    description: "Consonant characters",
    characters: [
      // Velars (ka-varga)
      { char: "क", name: "ka", romanization: "ka", unicode: "U+0915", category: "Velar" },
      { char: "ख", name: "kha", romanization: "kha", unicode: "U+0916", category: "Velar" },
      { char: "ग", name: "ga", romanization: "ga", unicode: "U+0917", category: "Velar" },
      { char: "घ", name: "gha", romanization: "gha", unicode: "U+0918", category: "Velar" },
      { char: "ङ", name: "ṅa", romanization: "nga", unicode: "U+0919", category: "Velar" },
      // Palatals (cha-varga)
      { char: "च", name: "ca", romanization: "cha", unicode: "U+091A", category: "Palatal" },
      { char: "छ", name: "cha", romanization: "chha", unicode: "U+091B", category: "Palatal" },
      { char: "ज", name: "ja", romanization: "ja", unicode: "U+091C", category: "Palatal" },
      { char: "झ", name: "jha", romanization: "jha", unicode: "U+091D", category: "Palatal" },
      { char: "ञ", name: "ña", romanization: "nya", unicode: "U+091E", category: "Palatal" },
      // Retroflex (ta-varga)
      { char: "ट", name: "ṭa", romanization: "Ta", unicode: "U+091F", category: "Retroflex" },
      { char: "ठ", name: "ṭha", romanization: "Tha", unicode: "U+0920", category: "Retroflex" },
      { char: "ड", name: "ḍa", romanization: "Da", unicode: "U+0921", category: "Retroflex" },
      { char: "ढ", name: "ḍha", romanization: "Dha", unicode: "U+0922", category: "Retroflex" },
      { char: "ण", name: "ṇa", romanization: "Na", unicode: "U+0923", category: "Retroflex" },
      // Dentals (ta-varga)
      { char: "त", name: "ta", romanization: "ta", unicode: "U+0924", category: "Dental" },
      { char: "थ", name: "tha", romanization: "tha", unicode: "U+0925", category: "Dental" },
      { char: "द", name: "da", romanization: "da", unicode: "U+0926", category: "Dental" },
      { char: "ध", name: "dha", romanization: "dha", unicode: "U+0927", category: "Dental" },
      { char: "न", name: "na", romanization: "na", unicode: "U+0928", category: "Dental" },
      // Labials (pa-varga)
      { char: "प", name: "pa", romanization: "pa", unicode: "U+092A", category: "Labial" },
      { char: "फ", name: "pha", romanization: "pha", unicode: "U+092B", category: "Labial" },
      { char: "ब", name: "ba", romanization: "ba", unicode: "U+092C", category: "Labial" },
      { char: "भ", name: "bha", romanization: "bha", unicode: "U+092D", category: "Labial" },
      { char: "म", name: "ma", romanization: "ma", unicode: "U+092E", category: "Labial" },
      // Semivowels (antaḥstha)
      { char: "य", name: "ya", romanization: "ya", unicode: "U+092F", category: "Semivowel" },
      { char: "र", name: "ra", romanization: "ra", unicode: "U+0930", category: "Semivowel" },
      { char: "ल", name: "la", romanization: "la", unicode: "U+0932", category: "Semivowel" },
      { char: "व", name: "va", romanization: "va/wa", unicode: "U+0935", category: "Semivowel" },
      // Sibilants (ūṣman)
      { char: "श", name: "śa", romanization: "sha", unicode: "U+0936", category: "Sibilant" },
      { char: "ष", name: "ṣa", romanization: "Sha", unicode: "U+0937", category: "Sibilant" },
      { char: "स", name: "sa", romanization: "sa", unicode: "U+0938", category: "Sibilant" },
      { char: "ह", name: "ha", romanization: "ha", unicode: "U+0939", category: "Sibilant" }
    ]
  },
  {
    id: "matras",
    name: "Vowel Diacritics (मात्रा)",
    description: "Dependent vowel signs",
    characters: [
      { char: "ा", name: "ā matra", romanization: "aa", unicode: "U+093E" },
      { char: "ि", name: "i matra", romanization: "i", unicode: "U+093F" },
      { char: "ी", name: "ī matra", romanization: "ii", unicode: "U+0940" },
      { char: "ु", name: "u matra", romanization: "u", unicode: "U+0941" },
      { char: "ू", name: "ū matra", romanization: "uu", unicode: "U+0942" },
      { char: "ृ", name: "ṛ matra", romanization: "ri", unicode: "U+0943" },
      { char: "ॄ", name: "ṝ matra", romanization: "rri", unicode: "U+0944" },
      { char: "ॢ", name: "ḷ matra", romanization: "lri", unicode: "U+0962" },
      { char: "ॣ", name: "ḹ matra", romanization: "lree", unicode: "U+0963" },
      { char: "े", name: "e matra", romanization: "e", unicode: "U+0947" },
      { char: "ै", name: "ai matra", romanization: "ai", unicode: "U+0948" },
      { char: "ो", name: "o matra", romanization: "o", unicode: "U+094B" },
      { char: "ौ", name: "au matra", romanization: "au", unicode: "U+094C" }
    ]
  },
  {
    id: "diacritics",
    name: "Diacritical Marks",
    description: "Anusvara, Visarga, Chandrabindu, Halant",
    characters: [
      { char: "ं", name: "Anusvara", romanization: "M", unicode: "U+0902" },
      { char: "ः", name: "Visarga", romanization: "H", unicode: "U+0903" },
      { char: "ँ", name: "Chandrabindu", romanization: "~", unicode: "U+0901" },
      { char: "्", name: "Halant/Virama", romanization: "", unicode: "U+094D" },
      { char: "़", name: "Nukta", romanization: "", unicode: "U+093C" }
    ]
  },
  {
    id: "nukta",
    name: "Nukta Characters",
    description: "Persian/Urdu characters with nukta dot",
    characters: [
      { char: "क़", name: "qa", romanization: "qa", unicode: "U+0958" },
      { char: "ख़", name: "x̱a", romanization: "kha", unicode: "U+0959" },
      { char: "ग़", name: "ġa", romanization: "gha", unicode: "U+095A" },
      { char: "ज़", name: "za", romanization: "za", unicode: "U+095B" },
      { char: "ड़", name: "ṛa", romanization: "Ra", unicode: "U+095C" },
      { char: "ढ़", name: "ṛha", romanization: "Rha", unicode: "U+095D" },
      { char: "फ़", name: "fa", romanization: "fa", unicode: "U+095E" },
      { char: "य़", name: "ẏa", romanization: "ya", unicode: "U+095F" }
    ]
  },
  {
    id: "digits",
    name: "Devanagari Digits",
    description: "Numerals 0-9",
    characters: [
      { char: "०", name: "Zero", romanization: "0", unicode: "U+0966" },
      { char: "१", name: "One", romanization: "1", unicode: "U+0967" },
      { char: "२", name: "Two", romanization: "2", unicode: "U+0968" },
      { char: "३", name: "Three", romanization: "3", unicode: "U+0969" },
      { char: "४", name: "Four", romanization: "4", unicode: "U+096A" },
      { char: "५", name: "Five", romanization: "5", unicode: "U+096B" },
      { char: "६", name: "Six", romanization: "6", unicode: "U+096C" },
      { char: "७", name: "Seven", romanization: "7", unicode: "U+096D" },
      { char: "८", name: "Eight", romanization: "8", unicode: "U+096E" },
      { char: "९", name: "Nine", romanization: "9", unicode: "U+096F" }
    ]
  },
  {
    id: "symbols",
    name: "Special Symbols",
    description: "Punctuation and special characters",
    characters: [
      { char: "।", name: "Danda", romanization: ".", unicode: "U+0964" },
      { char: "॥", name: "Double Danda", romanization: "..", unicode: "U+0965" },
      { char: "ॐ", name: "Om", romanization: "om", unicode: "U+0950" },
      { char: "ऽ", name: "Avagraha", romanization: ".a", unicode: "U+093D" },
      { char: "॰", name: "Abbreviation Sign", romanization: "", unicode: "U+0970" }
    ]
  }
];
class CharacterPaletteManager {
  options;
  recentCharacters = [];
  searchIndex = /* @__PURE__ */ new Map();
  constructor(options = {}) {
    this.options = {
      showRomanization: options.showRomanization ?? true,
      showUnicode: options.showUnicode ?? false,
      maxRecent: options.maxRecent ?? 20,
      onSelect: options.onSelect ?? (() => {
      })
    };
    this.buildSearchIndex();
  }
  /**
   * Build search index for fast lookups
   */
  buildSearchIndex() {
    for (const category of CHARACTER_CATEGORIES) {
      for (const char of category.characters) {
        const charKey = char.char.toLowerCase();
        if (!this.searchIndex.has(charKey)) {
          this.searchIndex.set(charKey, []);
        }
        this.searchIndex.get(charKey).push(char);
        const nameKey = char.name.toLowerCase();
        if (!this.searchIndex.has(nameKey)) {
          this.searchIndex.set(nameKey, []);
        }
        this.searchIndex.get(nameKey).push(char);
        if (char.romanization) {
          const romKey = char.romanization.toLowerCase();
          if (!this.searchIndex.has(romKey)) {
            this.searchIndex.set(romKey, []);
          }
          this.searchIndex.get(romKey).push(char);
        }
      }
    }
  }
  /**
   * Get all categories
   */
  getCategories() {
    return CHARACTER_CATEGORIES;
  }
  /**
   * Get characters by category ID
   */
  getCategoryCharacters(categoryId) {
    const category = CHARACTER_CATEGORIES.find((c) => c.id === categoryId);
    return category ? category.characters : [];
  }
  /**
   * Search characters by query
   */
  search(query) {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    const results = /* @__PURE__ */ new Set();
    if (this.searchIndex.has(q)) {
      this.searchIndex.get(q).forEach((char) => results.add(char));
    }
    for (const [key, chars] of this.searchIndex.entries()) {
      if (key.includes(q)) {
        chars.forEach((char) => results.add(char));
      }
    }
    return Array.from(results);
  }
  /**
   * Record character selection
   */
  selectCharacter(char) {
    this.recentCharacters = [
      char,
      ...this.recentCharacters.filter((c) => c.char !== char.char)
    ].slice(0, this.options.maxRecent);
    this.options.onSelect(char);
  }
  /**
   * Get recent characters
   */
  getRecentCharacters() {
    return [...this.recentCharacters];
  }
  /**
   * Clear recent characters
   */
  clearRecent() {
    this.recentCharacters = [];
  }
  /**
   * Get character info by character
   */
  getCharacterInfo(char) {
    const results = this.search(char);
    return results.find((c) => c.char === char);
  }
}
class NepaliConverterCore {
  state;
  options;
  debounceTimer = null;
  constructor(options = {}) {
    this.options = {
      useDevanagariDigits: options.useDevanagariDigits ?? true,
      bidirectional: options.bidirectional ?? false,
      debounceMs: options.debounceMs ?? 300,
      onInput: options.onInput ?? (() => {
      }),
      onChange: options.onChange ?? (() => {
      })
    };
    this.state = {
      input: "",
      output: "",
      direction: "toNepali"
    };
  }
  getState() {
    return { ...this.state };
  }
  setInput(text) {
    this.state.input = text;
    this.convert();
    if (this.debounceTimer !== null) {
      clearTimeout(this.debounceTimer);
    }
    this.debounceTimer = window.setTimeout(() => {
      this.options.onChange(this.state.input, this.state.output);
    }, this.options.debounceMs);
  }
  getOutput() {
    return this.state.output;
  }
  getInput() {
    return this.state.input;
  }
  setDirection(direction) {
    this.state.direction = direction;
    this.convert();
  }
  toggleDirection() {
    this.state.direction = this.state.direction === "toNepali" ? "toRoman" : "toNepali";
    this.convert();
  }
  getDirection() {
    return this.state.direction;
  }
  setUseDevanagariDigits(value) {
    this.options.useDevanagariDigits = value;
    this.convert();
  }
  getUseDevanagariDigits() {
    return this.options.useDevanagariDigits;
  }
  clear() {
    this.state.input = "";
    this.state.output = "";
    this.options.onInput("", "");
    this.options.onChange("", "");
  }
  convert() {
    if (!this.state.input) {
      this.state.output = "";
    } else if (this.state.direction === "toNepali") {
      this.state.output = transliterate(this.state.input, {
        useDevanagariDigits: this.options.useDevanagariDigits
      });
    } else {
      this.state.output = reverseTransliterate(this.state.input, {
        useLatinDigits: !this.options.useDevanagariDigits
      });
    }
    this.options.onInput(this.state.input, this.state.output);
  }
}
class NepaliConverter {
  core;
  inputElement;
  outputElement;
  copyButton;
  constructor(inputElement, outputElement, copyButton, options = {}) {
    this.inputElement = inputElement;
    this.outputElement = outputElement;
    this.copyButton = copyButton || null;
    this.core = new NepaliConverterCore({
      ...options,
      onInput: (input, output) => {
        this.updateOutput(output);
        options.onInput?.(input, output);
      },
      onChange: (input, output) => {
        options.onChange?.(input, output);
      }
    });
    this.init();
  }
  init() {
    this.inputElement.setAttribute("autocomplete", "off");
    this.inputElement.setAttribute("autocorrect", "off");
    this.inputElement.setAttribute("autocapitalize", "off");
    this.inputElement.setAttribute("spellcheck", "false");
    this.inputElement.addEventListener("input", this.handleInput);
    if (this.copyButton) {
      this.copyButton.addEventListener("click", this.handleCopy);
    }
    if (this.inputElement.value) {
      this.core.setInput(this.inputElement.value);
    }
  }
  handleInput = () => {
    this.core.setInput(this.inputElement.value);
  };
  updateOutput(text) {
    if (this.outputElement.tagName === "TEXTAREA" || this.outputElement.tagName === "INPUT") {
      this.outputElement.value = text;
    } else {
      this.outputElement.textContent = text;
    }
  }
  handleCopy = async () => {
    const output = this.core.getOutput();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(output);
        this.showCopyFeedback();
        return;
      }
    } catch (err) {
    }
    const textarea = document.createElement("textarea");
    textarea.value = output;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
      this.showCopyFeedback();
    } catch (err) {
      console.error("Failed to copy:", err);
    } finally {
      document.body.removeChild(textarea);
    }
  };
  showCopyFeedback() {
    if (!this.copyButton) return;
    const originalText = this.copyButton.textContent;
    this.copyButton.textContent = "✓ Copied!";
    this.copyButton.disabled = true;
    setTimeout(() => {
      this.copyButton.textContent = originalText;
      this.copyButton.disabled = false;
    }, 2e3);
  }
  // Public methods
  getCore() {
    return this.core;
  }
  setInput(text) {
    this.inputElement.value = text;
    this.core.setInput(text);
  }
  getOutput() {
    return this.core.getOutput();
  }
  clear() {
    this.inputElement.value = "";
    this.core.clear();
  }
  setDirection(direction) {
    this.core.setDirection(direction);
  }
  toggleDirection() {
    this.core.toggleDirection();
  }
  destroy() {
    this.inputElement.removeEventListener("input", this.handleInput);
    if (this.copyButton) {
      this.copyButton.removeEventListener("click", this.handleCopy);
    }
  }
}
function createNepaliConverter(inputSelector, outputSelector, copyButtonSelector, options) {
  const inputElement = typeof inputSelector === "string" ? document.querySelector(inputSelector) : inputSelector;
  const outputElement = typeof outputSelector === "string" ? document.querySelector(outputSelector) : outputSelector;
  const copyButton = copyButtonSelector ? typeof copyButtonSelector === "string" ? document.querySelector(copyButtonSelector) : copyButtonSelector : null;
  if (!inputElement) {
    throw new Error("Input element not found");
  }
  if (!outputElement) {
    throw new Error("Output element not found");
  }
  return new NepaliConverter(inputElement, outputElement, copyButton || void 0, options);
}
class NepaliInputBase {
  element;
  options;
  core;
  enabled = true;
  characterSelector = null;
  pendingInput = "";
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      useDevanagariDigits: options.useDevanagariDigits ?? true,
      autoConvert: options.autoConvert ?? true,
      enableCharacterSelector: options.enableCharacterSelector ?? true,
      onInput: options.onInput ?? (() => {
      }),
      onChange: options.onChange ?? (() => {
      })
    };
    this.core = new NepaliIMECore({
      useDevanagariDigits: this.options.useDevanagariDigits,
      onStateChange: (state) => this.onCoreStateChange(state)
    });
    if (this.options.enableCharacterSelector) {
      this.characterSelector = new CharacterSelector({
        onSelect: (character) => this.handleCharacterSelect(character),
        onCancel: () => this.handleCharacterCancel()
      });
      if (typeof window !== "undefined") {
        window.nepaliCharSelector = this.characterSelector;
      }
    }
    this.init();
  }
  init() {
    this.element.setAttribute("lang", "ne");
    this.element.setAttribute("autocomplete", "off");
    this.element.setAttribute("autocorrect", "off");
    this.element.setAttribute("autocapitalize", "off");
    this.element.setAttribute("spellcheck", "false");
    this.element.addEventListener("keydown", this.handleKeydown);
    this.element.addEventListener("input", this.handleNativeInput);
    this.element.addEventListener("paste", this.handlePaste);
    this.element.addEventListener("blur", this.handleBlur);
  }
  onCoreStateChange(state) {
    if (this.element.value !== state.output) {
      this.element.value = state.output;
    }
    this.updateCursor(state);
    this.options.onInput(state.output);
  }
  handleKeydown = (e) => {
    if (!this.enabled || !this.options.autoConvert) return;
    if (this.characterSelector?.isOpen()) {
      return;
    }
    const key = e.key;
    if (key === "." && this.options.enableCharacterSelector) {
      const currentValue = this.core.getValue();
      const lastChars = currentValue.slice(-3);
      const potentialInput = lastChars + key;
      const alternatives = getCharacterAlternatives(potentialInput.slice(-3));
      if (alternatives.length > 0) {
        e.preventDefault();
        this.showCharacterSelector(alternatives, potentialInput.slice(-2, -1));
        return;
      }
    }
    const hasSelection = this.element.selectionStart !== this.element.selectionEnd;
    if (hasSelection && (key === "Backspace" || key === "Delete")) {
      return;
    }
    const handled = this.core.handleKey(key, {
      ctrl: e.ctrlKey,
      alt: e.altKey,
      meta: e.metaKey
    });
    if (handled) {
      e.preventDefault();
    }
  };
  handlePaste = (e) => {
    if (!this.enabled || !this.options.autoConvert) return;
    e.preventDefault();
    const text = e.clipboardData?.getData("text/plain") || "";
    this.core.insertText(text);
    this.options.onChange(this.core.getValue());
  };
  handleNativeInput = () => {
    if (!this.enabled || !this.options.autoConvert) return;
    const value = this.element.value;
    if (value !== this.core.getValue()) {
      this.core.setValue(value);
    }
  };
  handleBlur = () => {
    this.options.onChange(this.core.getValue());
  };
  showCharacterSelector(alternatives, baseInput) {
    if (!this.characterSelector) return;
    this.pendingInput = baseInput;
    const rect = this.element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    this.characterSelector.show(alternatives, {
      x: rect.left + scrollLeft + 20,
      y: rect.top + scrollTop + rect.height + 5
    });
  }
  handleCharacterSelect(character) {
    const currentValue = this.core.getValue();
    const withoutPending = currentValue.slice(0, -this.pendingInput.length - 1);
    this.core.setValue(withoutPending + character);
    this.pendingInput = "";
    this.options.onChange(this.core.getValue());
  }
  handleCharacterCancel() {
    this.pendingInput = "";
  }
  disable() {
    this.enabled = false;
  }
  isEnabled() {
    return this.enabled;
  }
  setValue(value) {
    this.core.setValue(value);
  }
  getValue() {
    return this.core.getValue();
  }
  clear() {
    this.core.clear();
  }
  setOptions(options) {
    this.options = { ...this.options, ...options };
    if (options.useDevanagariDigits !== void 0) {
      this.core.setUseDevanagariDigits(options.useDevanagariDigits);
    }
  }
  getCore() {
    return this.core;
  }
  destroy() {
    this.element.removeEventListener("keydown", this.handleKeydown);
    this.element.removeEventListener("input", this.handleNativeInput);
    this.element.removeEventListener("paste", this.handlePaste);
    this.element.removeEventListener("blur", this.handleBlur);
    if (this.characterSelector) {
      this.characterSelector.destroy();
      this.characterSelector = null;
      if (typeof window !== "undefined") {
        window.nepaliCharSelector = void 0;
      }
    }
  }
}
class NepaliInput extends NepaliInputBase {
  updateCursor(_state) {
  }
}
function createNepaliInput(selector, options) {
  const element = typeof selector === "string" ? document.querySelector(selector) : selector;
  if (!element) {
    throw new Error("Input element not found");
  }
  return new NepaliInput(element, options);
}
class NepaliTextarea extends NepaliInputBase {
  updateCursor(state) {
    this.element.selectionStart = state.cursorPosition;
    this.element.selectionEnd = state.cursorPosition;
  }
}
function createNepaliTextarea(selector, options) {
  const element = typeof selector === "string" ? document.querySelector(selector) : selector;
  if (!element) {
    throw new Error("Textarea element not found");
  }
  return new NepaliTextarea(element, options);
}
exports.AutocompleteManager = AutocompleteManager;
exports.CHARACTER_CATEGORIES = CHARACTER_CATEGORIES;
exports.COMMON_WORDS = COMMON_WORDS;
exports.CharacterPaletteManager = CharacterPaletteManager;
exports.CharacterSelector = CharacterSelector;
exports.DEVANAGARI_TO_IAST = DEVANAGARI_TO_IAST;
exports.HARVARD_KYOTO_TO_DEVANAGARI = HARVARD_KYOTO_TO_DEVANAGARI;
exports.HistoryManager = HistoryManager;
exports.IAST_TO_DEVANAGARI = IAST_TO_DEVANAGARI;
exports.ISO15919_TO_DEVANAGARI = ISO15919_TO_DEVANAGARI;
exports.KeyboardShortcutManager = KeyboardShortcutManager;
exports.LEXICON_ENTRIES = LEXICON_ENTRIES;
exports.NepaliConverter = NepaliConverter;
exports.NepaliConverterCore = NepaliConverterCore;
exports.NepaliIMECore = NepaliIMECore;
exports.NepaliInput = NepaliInput;
exports.NepaliInputBase = NepaliInputBase;
exports.NepaliTextarea = NepaliTextarea;
exports.SCHEMES = SCHEMES;
exports.SLP1_TO_DEVANAGARI = SLP1_TO_DEVANAGARI;
exports.VELTHUIS_TO_DEVANAGARI = VELTHUIS_TO_DEVANAGARI;
exports.buildMapping = buildMapping;
exports.createDefaultShortcuts = createDefaultShortcuts;
exports.createHarvardKyotoMappings = createHarvardKyotoMappings;
exports.createIASTMappings = createIASTMappings;
exports.createISO15919Mappings = createISO15919Mappings;
exports.createNepaliConverter = createNepaliConverter;
exports.createNepaliInput = createNepaliInput;
exports.createNepaliTextarea = createNepaliTextarea;
exports.createSLP1Mappings = createSLP1Mappings;
exports.createVelthuisMappings = createVelthuisMappings;
exports.devanagariToIAST = devanagariToIAST;
exports.getCharacterAlternatives = getCharacterAlternatives;
exports.getSchemeInfo = getSchemeInfo;
exports.harvardKyotoConsonantMapping = harvardKyotoConsonantMapping;
exports.harvardKyotoDiacriticMapping = harvardKyotoDiacriticMapping;
exports.harvardKyotoToDevanagari = harvardKyotoToDevanagari;
exports.harvardKyotoVowelMapping = harvardKyotoVowelMapping;
exports.iastConsonantMapping = iastConsonantMapping;
exports.iastDiacriticMapping = iastDiacriticMapping;
exports.iastToDevanagari = iastToDevanagari;
exports.iastVowelMapping = iastVowelMapping;
exports.iso15919ConsonantMapping = iso15919ConsonantMapping;
exports.iso15919DiacriticMapping = iso15919DiacriticMapping;
exports.iso15919ToDevanagari = iso15919ToDevanagari;
exports.iso15919VowelMapping = iso15919VowelMapping;
exports.reverseTransliterate = reverseTransliterate;
exports.slp1ConsonantMapping = slp1ConsonantMapping;
exports.slp1DiacriticMapping = slp1DiacriticMapping;
exports.slp1ToDevanagari = slp1ToDevanagari;
exports.slp1VowelMapping = slp1VowelMapping;
exports.transliterate = transliterate;
exports.velthuisConsonantMapping = velthuisConsonantMapping;
exports.velthuisDiacriticMapping = velthuisDiacriticMapping;
exports.velthuisToDevanagari = velthuisToDevanagari;
exports.velthuisVowelMapping = velthuisVowelMapping;
//# sourceMappingURL=index.cjs.map
