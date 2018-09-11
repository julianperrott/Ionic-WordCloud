import { Component } from '@angular/core';
import { ConfigurationService } from '../../services/configuration.service';

@Component({
    selector: 'page-popover',
    templateUrl: 'fontPicker.html'
})
export class FontPicker {
    fontFace = '';

    constructor(private configurationService: ConfigurationService,
    ) {
        this.fontFace = configurationService.fontFace;
    }

    fontSelected(font) {
        this.configurationService.fontFace = font[0];
        this.configurationService.fontFaceName = font[1];
        this.configurationService.fontChanged('');
        this.fontFace = this.configurationService.fontFace;
    }

    fonts = [
        ['Arvo', 'Arvo'],
        ['HennyPenny', 'Henny Penny'],
        ['HermeneusOne', 'Hermeneus One'],
        ['HerrVonMuellerhoff', 'Herr Von Muellerhoff'],
        ['HoltwoodOneSC', 'Holtwood One SC'],
        ['Homenaje', 'Homenaje'],
        ['IBMPlexSerif', 'IBM Plex Serif'],
        ['Imprima', 'Imprima'],
        ['IndieFlower', 'Indie Flower'],
        ['InknutAntiqua', 'Inknut Antiqua'],
        ['IstokWeb', 'Istok Web'],
        ['Italianno', 'Italianno'],
        ['Itim', 'Itim'],
        ['JacquesFrancois', 'Jacques Francois'],
        ['Jaldi', 'Jaldi'],
        ['JimNightshade', 'Jim Nightshade'],
        ['Jomhuria', 'Jomhuria'],
        ['JosefinSans', 'Josefin Sans'],
        ['JosefinSlab', 'Josefin Slab'],
        ['Judson', 'Judson'],
        ['Katibeh', 'Katibeh'],
        ['Kavivanar', 'Kavivanar'],
        ['Kavoon', 'Kavoon'],
        ['KeaniaOne', 'Keania One'],
        ['Kenia', 'Kenia'],
        ['Khand', 'Khand'],
        ['Khmer', 'Khmer'],
        ['KottaOne', 'Kotta One'],
        ['Kreon', 'Kreon'],
        ['Kristi', 'Kristi'],
        ['KronaOne', 'Krona One'],
        ['Kurale', 'Kurale'],
        ['LaBelleAurore', 'La Belle Aurore'],
        ['Laila', 'Laila'],
        ['LakkiReddy', 'Lakki Reddy'],
        ['Lancelot', 'Lancelot'],
        ['LaoMuangDon', 'Lao Muang Don'],
        ['LaoMuangKhong', 'Lao Muang Khong'],
        ['LaoSansPro', 'Lao Sans Pro'],
        ['LateefRegOT', 'Lateef Reg OT'],
        ['Lato', 'Lato'],
        ['LeagueScript', 'League Script'],
        ['Lekton', 'Lekton'],
        ['Lemon', 'Lemon'],
        ['LibreBarcode39', 'Libre Barcode39'],
        ['LibreBaskerville', 'Libre Baskerville'],
        ['LibreCaslonText', 'Libre Caslon Text'],
        ['LibreFranklin', 'Libre Franklin'],
        ['LifeSavers', 'Life Savers'],
        ['Limelight', 'Limelight'],
        ['Lobster', 'Lobster'],
        ['LobsterTwo', 'Lobster Two'],
        ['Lohit-Tamil', 'Lohit- Tamil'],
        ['LondrinaShadow', 'Londrina Shadow'],
        ['LondrinaSketch', 'Londrina Sketch'],
        ['LondrinaSolid', 'Londrina Solid'],
        ['Macondo', 'Macondo'],
        ['Magra', 'Magra'],
        ['Maitree', 'Maitree'],
        ['Mako', 'Mako'],
        ['Mandali', 'Mandali'],
        ['Marcellus', 'Marcellus'],
        ['MarcellusSC', 'Marcellus SC'],
        ['Margarine', 'Margarine'],
        ['Marmelad', 'Marmelad'],
        ['Martel', 'Martel'],
        ['MartelSans', 'Martel Sans'],
        ['Marvel', 'Marvel'],
        ['Mate', 'Mate'],
        ['McLaren', 'Mc Laren'],
        ['MedievalSharp', 'Medieval Sharp'],
        ['MeeraInimai', 'Meera Inimai'],
        ['MeieScript', 'Meie Script'],
        ['Merienda', 'Merienda'],
        ['MeriendaOne', 'Merienda One'],
        ['Merriweather', 'Merriweather'],
        ['Metal', 'Metal'],
        ['MetalMania', 'Metal Mania'],
        ['Metamorphous', 'Metamorphous'],
        ['Metrophobic', 'Metrophobic'],
        ['Miama', 'Miama'],
        ['Michroma', 'Michroma'],
        ['Milonga', 'Milonga'],
        ['MiltonianTattoo', 'Miltonian Tattoo'],
        ['Mina-Bold', 'Mina'],
        ['Miniver', 'Miniver'],
        ['Mitr', 'Mitr'],
        ['ModernAntiqua', 'Modern Antiqua'],
        ['Mogra', 'Mogra'],
        ['Molengo', 'Molengo'],
        ['Molle', 'Molle'],
        ['MonsieurLaDoulaise', 'Monsieur La Doulaise'],
        ['Montserrat', 'Montserrat'],
        ['Moulpali', 'Moulpali'],
        ['MouseMemoirs', 'Mouse Memoirs'],
        ['MrBedfort', 'Mr Bedfort'],
        ['MrDafoe', 'Mr Dafoe'],
        ['Mukta', 'Mukta'],
        ['MuktaMahee', 'Mukta Mahee'],
        ['MuktaMalar', 'Mukta Malar'],
        ['MysteryQuest', 'Mystery Quest'],
        ['Neucha', 'Neucha'],
        ['Neuton', 'Neuton'],
        ['NewRocker', 'New Rocker'],
        ['NicoMoji', 'Nico Moji'],
        ['Nikukyu', 'Nikukyu'],
        ['NixieOne', 'Nixie One'],
        ['Nobile', 'Nobile'],
        ['Norican', 'Norican'],
        ['NothingYouCouldDo', 'Nothing You Could Do'],
        ['NoticiaText', 'Noticia Text'],
        ['NotoSerif', 'Noto Serif'],
        ['NovaScript', 'Nova Script'],
        ['NTR', 'NTR'],
        ['Nunito', 'Nunito'],
        ['NunitoSans', 'Nunito Sans'],
        ['Oldenburg', 'Oldenburg'],
        ['OldStandardTT', 'Old Standard TT'],
        ['OleoScriptSwashCaps', 'Oleo Script Swash Caps'],
        ['OpenSans', 'Open Sans'],
        ['Orbitron', 'Orbitron'],
        ['Orienta', 'Orienta'],
        ['OriginalSurfer', 'Original Surfer'],
        ['OxygenMono', 'Oxygen Mono'],
        ['Pacifico', 'Pacifico'],
        ['Pangolin', 'Pangolin'],
        ['Paprika', 'Paprika'],
        ['Parisienne', 'Parisienne'],
        ['Pavanam', 'Pavanam'],
        ['PaytoneOne', 'Paytone One'],
        ['Peralta', 'Peralta'],
        ['PermanentMarker', 'Permanent Marker'],
        ['PinyonScript', 'Pinyon Script'],
        ['PoetsenOne', 'Poetsen One'],
        ['PollerOne', 'Poller One'],
        ['Pompiere', 'Pompiere'],
        ['Ponnala', 'Ponnala'],
        ['PontanoSans', 'Pontano Sans'],
        ['Poppins', 'Poppins'],
        ['PortLligatSlab', 'Port Lligat Slab'],
        ['PostNoBillsColombo', 'Post No Bills Colombo'],
        ['PostNoBillsJaffna', 'Post No Bills Jaffna'],
        ['PragatiNarrow-Bold', 'Pragati'],
        ['Preahvihear', 'Preahvihear'],
        ['PressStart2P', 'Press Start 2P'],
        ['Pridi-SemiBold', 'Pridi'],
        ['PrincessSofia', 'Princess Sofia'],
        ['Prociono', 'Prociono'],
        ['Prompt', 'Prompt'],
        ['ProzaLibre', 'Proza Libre'],
        ['PT_Serif-Web', 'P Serif Web'],
        ['PTM55FT', 'PTM55FT'],
        ['Puritan', 'Puritan'],
        ['Quando', 'Quando'],
        ['Quantico', 'Quantico'],
        ['Quicksand', 'Quicksand'],
        ['Quintessential', 'Quintessential'],
        ['RacingSansOne', 'Racing Sans One'],
        ['Rakkas', 'Rakkas'],
        ['Raleway', 'Raleway'],
        ['Ranchers', 'Ranchers'],
        ['Ranga', 'Ranga'],
        ['Rationale', 'Rationale'],
        ['Redacted', 'Redacted'],
        ['RedactedScript', 'Redacted Script'],
        ['RibeyeMarrow', 'Ribeye Marrow'],
        ['Righteous', 'Righteous'],
        ['Risque', 'Risque'],
        ['Romanesco', 'Romanesco'],
        ['RozhaOne', 'Rozha One'],
        ['Russoone', 'Russo one'],
        ['Ruthie', 'Ruthie'],
        ['Sahitya', 'Sahitya'],
        ['Saira', 'Saira'],
        ['SairaCondensed', 'Saira Condensed'],
        ['SairaSemiCondensed', 'Saira Semi Condensed'],
        ['Salsa', 'Salsa'],
        ['Sansita', 'Sansita'],
        ['SansitaOne', 'Sansita One'],
        ['Sarpanch', 'Sarpanch'],
        ['Scada', 'Scada'],
        ['Scheherazade', 'Scheherazade'],
        ['ScopeOne', 'Scope One'],
        ['SedgwickAve', 'Sedgwick Ave'],
        ['SedgwickAveDisplay', 'Sedgwick Ave Display'],
        ['Sevillana', 'Sevillana'],
        ['SeymourOne', 'Seymour One'],
        ['ShadowsIntoLight', 'Shadows Into Light'],
        ['Shanti', 'Shanti'],
        ['Share', 'Share'],
        ['ShareTech', 'Share Tech'],
        ['ShareTechMono', 'Share Tech Mono'],
        ['Siemreap', 'Siemreap'],
        ['SigmarOne', 'Sigmar One'],
        ['SingleDay', 'Single Day'],
        ['Sintony', 'Sintony'],
        ['SirinStencil', 'Sirin Stencil'],
        ['Sitara', 'Sitara'],
        ['Slabo13px', 'Slabo13px'],
        ['Slabo27px', 'Slabo27px'],
        ['Snippet', 'Snippet'],
        ['SnowburstOne', 'Snowburst One'],
        ['SofadiOne', 'Sofadi One'],
        ['SonsieOne', 'Sonsie One'],
        ['SortsMillGoudy', 'Sorts Mill Goudy'],
        ['Souliyo', 'Souliyo'],
        ['SourceCodePro', 'Source Code Pro'],
        ['Spectral', 'Spectral'],
        ['SpectralSC', 'Spectral SC'],
        ['SpicyRice', 'Spicy Rice'],
        ['SreeKrushnadevaraya', 'Sree Krushnadevaraya'],
        ['Sriracha', 'Sriracha'],
        ['Stalemate', 'Stalemate'],
        ['StintUltraCondensed', 'Stint Ultra Condensed'],
        ['Strong', 'Strong'],
        ['SueEllenFrancisco', 'Sue Ellen Francisco'],
        ['SuezOne', 'Suez One'],
        ['Sunflower-Medium', 'Sunflower'],
        ['Sura-Bold', 'Sura'],
        ['Suranna', 'Suranna'],
        ['Suravaram', 'Suravaram'],
        ['Taprom', 'Taprom'],
        ['Tauri', 'Tauri'],
        ['Taviraj', 'Taviraj'],
        ['Telex', 'Telex'],
        ['TenorSans', 'Tenor Sans'],
        ['Tienne', 'Tienne'],
        ['TitanOne', 'Titan One'],
        ['TitilliumWeb', 'Titillium Web'],
        ['Trirong', 'Trirong'],
        ['Trochut', 'Trochut'],
        ['Trykker', 'Trykker'],
        ['Tuffy', 'Tuffy'],
        ['Ubuntu', 'Ubuntu'],
        ['UnifrakturCook-Bold', 'Unifraktur Cook'],
        ['UnifrakturMaguntia-Book', 'UnifrakturMaguntia'],
        ['Unna', 'Unna'],
        ['VastShadow', 'Vast Shadow'],
        ['VesperLibre', 'Vesper Libre'],
        ['Vibur', 'Vibur'],
        ['Voces', 'Voces'],
        ['Vollkorn', 'Vollkorn'],
        ['Voltaire', 'Voltaire'],
        ['VT323', 'VT323'],
        ['Wallpoet', 'Wallpoet'],
        ['Warnes', 'Warnes'],
        ['Wellfleet', 'Wellfleet'],
        ['WireOne', 'Wire One'],
        ['YaldeviColombo', 'Yaldevi Colombo'],
        ['YanoneKaffeesatz', 'Yanone Kaffeesatz'],
        ['Yantramanav', 'Yantramanav'],
        ['YatraOne', 'Yatra One'],
        ['Yesteryear', 'Yesteryear'],
        ['ZillaSlab', 'Zilla Slab']
    ];
}