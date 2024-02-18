import { useId, useState } from 'react';
import Select from 'react-select'
import './SendRecipePage.scss';
import axios from 'axios';
import { ImListNumbered } from "react-icons/im";
import { GiCoolSpices } from "react-icons/gi";
import { FaInfo } from "react-icons/fa";
import { FaRegImages, FaPlus } from "react-icons/fa6";
import { FaFlagCheckered } from "react-icons/fa";
import FormWizard from "react-form-wizard-component";
import "react-form-wizard-component/dist/style.css";

const SendRecipePage = () => {
    const [formData, setFormData] = useState({
        title: "",
        imgPath: "",
        time: "",
        portions: 1,
        brief: "",
        ingredients: [{ name: "", amount: "", unit: "" }],
        instructions: [{ stepNumber: 1, description: "" }],
        type: "",
        allergens: [],
        tags: []
    });
    const [imageFile, setImageFile] = useState(null);
    const id = useId();
    const { title, time, portions, ingredients, instructions, brief, type, allergens, tags } = formData;
    const timeItems = [
        { value: "alle_15_min", label: "Alle 15 min" },
        { value: "15_30_min", label: "15-30 min" },
        { value: "30_60_min", label: "30-60 min" },
        { value: "yli_tunti", label: "Yli tunti" },
        { value: "yli_24h", label: "Yli 24h" }
    ];
    const typeItems = [
        { value: "alkuruoka", label: "Alkuruoka" },
        { value: "pääruoka", label: "Pääruoka" },
        { value: "jälkiruoka", label: "Jälkiruoka" },
        { value: "juoma", label: "Juoma" }
    ];
    const allergyItems = [
        { value: "maito", label: "Maito" },
        { value: "munat", label: "Munat" },
        { value: "pähkinät", label: "Pähkinät" },
        { value: "viljat", label: "Viljat (gluteenia sisältävät)" },
        { value: "kala", label: "Kala" },
        { value: "äyriäiset", label: "Äyriäiset" },
        { value: "soija", label: "Soija" },
        { value: "seesaminsiemenet", label: "Seesaminsiemenet" },
        { value: "sinappi", label: "Sinappi" },
        { value: "selleri", label: "Selleri" },
        { value: "lupiini", label: "Lupiini" },
        { value: "nilviäiset", label: "Nilviäiset" },
        { value: "maapähkinät", label: "Maapähkinät" },
        { value: "saksanpähkinät", label: "Saksanpähkinät" },
        { value: "mantelit", label: "Mantelit" },
        { value: "cashew-pähkinät", label: "Cashew-pähkinät" },
        { value: "hasselpähkinät", label: "Hasselpähkinät" },
        { value: "pistaasipähkinät", label: "Pistaasipähkinät" },
        { value: "macadamia-pähkinät", label: "Macadamia-pähkinät" },
        { value: "gluteeni", label: "Gluteeni (eri viljat kuten vehnä, ohra, ruis)" }
    ];
    const dietItems = [
        { value: "gluteeniton", label: "Gluteeniton" },
        { value: "laktoositon", label: "Laktoositon" },
        { value: "kasvis", label: "Kasvis" },
        { value: "lakto-ovo-vegetaarinen", label: "Lakto-ovo-vegetaarinen" },
        { value: "vegaaninen", label: "Vegaaninen" },
        { value: "maidoton", label: "Maidoton" },
        { value: "paleo", label: "Paleo" },
        { value: "keto", label: "Keto" },
        { value: "kalaton", label: "Kalaton" },
        { value: "munaton", label: "Munaton" },
        { value: "pähkinätön", label: "Pähkinätön" },
        { value: "soijaton", label: "Soijaton" },
        { value: "vehnätön", label: "Vehnätön" },
        { value: "maidoton", label: "Maidoton" },
        { value: "hiivaton", label: "Hiivaton" },
        { value: "sokeriton", label: "Sokeriton" },
        { value: "lihaton", label: "Lihaton" },
        { value: "jalostamaton", label: "Jalostamaton" },
        { value: "kasviperäinen", label: "Kasviperäinen" },
        { value: "luomu", label: "Luomu" }
    ];

    const tabChanged = ({ prevIndex, nextIndex }) => {
        // console.log("prevIndex", prevIndex);
        // console.log("nextIndex", nextIndex);
        console.log(formData);
    };

    const validateInfo = () => {
        if (title === "" || brief === "" || portions === "") {
            return false;
        }
    };

    const errorMessages = () => {
        alert("Täytä tarvittavat kentät.");
    };

    const onImageChange = (event) => {
        const file = event.target.files[0];
        setImageFile(file);
    };

    const handleComplete = async () => {
        try {
            // Image
            const imageData = new FormData();
            imageData.append('image', imageFile);
            const imageConfig = {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            };
            const imageResponse = await axios.post("http://localhost:5000/api/uploadS3/upload", imageData, imageConfig);
            // const imgPath = imageResponse.data.filePath;
            const imgPath = imageResponse.data.imageUrl;
    
            // Recipe
            const newRecipe = {
                title, imgPath, time, portions, ingredients, instructions, brief, type, allergens, tags
            };
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            };
            const body = JSON.stringify(newRecipe);
            const res = await axios.post("http://localhost:5000/api/recipes", body, config);
            console.log("Success: ", res);
        } catch(err) {
            console.log(err.response.data);
        }
    };

    const onChange = (event, index, field, isInstruction = false, isIngredient = false) => {
        //console.log(event, index, field);
        if (isInstruction || isIngredient) {
            // const newData = isInstruction ? [...instructions] : [...ingredients];
            const newData = isInstruction || isIngredient ? [...(isInstruction ? instructions : ingredients)] : { ...formData };

            if (!newData[index]) {
                newData[index] = {};  // Ensure the object exists at the specified index
            }

            newData[index][field] = event.target.value;
            setFormData({
                ...formData,
                [isInstruction ? 'instructions' : 'ingredients']: newData,
            });
        } else {
            setFormData({
                ...formData,
                [event.target.name]: event.target.value
            });
        }
    };

    const addItem = (isInstruction) => {
        const newData = [...(isInstruction ? instructions : ingredients)];
        const newItem = isInstruction ? { stepNumber: newData.length + 1, description: '' } : { name: '', amount: '', unit: '' };

        setFormData({ ...formData, [isInstruction ? 'instructions' : 'ingredients']: [...newData, newItem] });
    };

    const removeItem = (index, isInstruction) => {
        const newData = [...(isInstruction ? instructions : ingredients)];
        newData.splice(index, 1);
    
        setFormData({
            ...formData,
            [isInstruction ? 'instructions' : 'ingredients']: newData
        });
    };

    return (
        <div className="mt-3">
            <h1 className="d-flex justify-content-center py-3 text-4xl">Lähetä resepti!</h1>
            <hr />
            <div className="container">
                <FormWizard 
                    onComplete={handleComplete}
                    onTabChange={tabChanged}
                    stepSize="sm"
                    nextButtonText="Seuraava"
                    backButtonText="Edellinen"
                    finishButtonText="Lähetä resepti"
                    className="container">

                    <FormWizard.TabContent title="Reseptin tiedot" icon={<FaInfo />}>
                        <div className="recipe-card recipe-info">
                            <input className="recipe-input" value={title} type="text" placeholder="Aterian nimi" name="title" id={`title-${id}`} onChange={(event) => onChange(event, 1, 'title')} required />
                            <textarea className="recipe-input" value={brief} placeholder="Lyhyt kuvaus" name="brief" id={`brief-${id}`} rows="5" onChange={(event) => onChange(event, 1, 'brief')} maxLength="500" required></textarea>
                            <div className="flex flex-row items-center">
                                <input className="recipe-input mr-2" value={portions} type="number" min="1" placeholder="Annoskoko" name="portions" id={`portions-${id}`} onChange={(event) => onChange(event, 1, 'portions')} required /> {portions < 2 ? <span style={{width: "62px"}}> annos</span> : <span style={{width: "62px"}}> annosta</span>}
                            </div>
                            <Select options={timeItems} className="my-1" onChange={(event) => setFormData({...formData, time: event})} defaultValue={time} isClearable={true} placeholder="Valmistusaika" noOptionsMessage={() => "Ei tuloksia"} />
                            <Select options={typeItems} className="my-1" onChange={(event) => setFormData({...formData, type: event})} defaultValue={type} isClearable={true} placeholder="Ruokalaji" noOptionsMessage={() => "Ei tuloksia"} />
                            
                        </div>
                    </FormWizard.TabContent>

                    <FormWizard.TabContent title="Ainekset" icon={<GiCoolSpices />} isValid={validateInfo()} validationError={errorMessages}>
                        <div className="recipe-card recipe-ingredients">
                            {ingredients.map((ingredient, index) => (
                                <div key={index}>
                                    <div className="my-2 py-3">
                                        <input
                                            className="recipe-input"
                                            type="text"
                                            placeholder="Aineksen nimi"
                                            name="name"
                                            id={`ingredient-name-${index}-${id}`}
                                            value={ingredient.name || ""}
                                            onChange={(event) => onChange(event, index, 'name', false, true)}
                                            required
                                        />
                                        <input
                                            className="recipe-input"
                                            type="number"
                                            placeholder="Määrä"
                                            name="amount"
                                            id={`ingredient-amount-${index}-${id}`}
                                            value={ingredient.amount || ""}
                                            onChange={(event) => onChange(event, index, 'amount', false, true)}
                                            required
                                        />
                                        <input
                                            className="recipe-input"
                                            type="text"
                                            placeholder="Yksikkö"
                                            name="unit"
                                            id={`ingredient-unit-${index}-${id}`}
                                            value={ingredient.unit || ""}
                                            onChange={(event) => onChange(event, index, 'unit', false, true)}
                                            required
                                        />
                                        {index > 0 && (
                                            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 text-uppercase mt-3" type="button" onClick={() => removeItem(index, false)}>
                                                Poista
                                            </button>
                                        )}
                                        
                                    </div>
                                    <hr />
                                </div>
                            ))}
                            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 text-uppercase inline-flex items-center mt-3" type="button" onClick={() => addItem(false)}>
                                <FaPlus className="mr-2" />
                                <span>Lisää Aines</span>
                            </button>
                        </div>
                    </FormWizard.TabContent>

                    <FormWizard.TabContent title="Valmistusohjeet" icon={<ImListNumbered />}>
                        <div className="recipe-card recipe-instructions">
                            {instructions.map((instruction, index) => (
                                <div key={index}>
                                    <div className="my-2 py-3">
                                        <input
                                            className="recipe-input"
                                            type="number"
                                            placeholder="Vaihe"
                                            name="stepNumber"
                                            id={`instruction-stepNumber-${index}-${id}`}
                                            value={instruction.stepNumber}
                                            onChange={(event) => onChange(event, index, 'stepNumber', true)}
                                            required
                                        />
                                        <textarea
                                            className="recipe-input"
                                            placeholder="Kuvaus"
                                            name="description"
                                            id={`instruction-description-${index}-${id}`}
                                            value={instruction.description}
                                            onChange={(event) => onChange(event, index, 'description', true)}
                                            required>
                                        </textarea>
                                        {index > 0 && (
                                            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 text-uppercase mt-3" type="button" onClick={() => removeItem(index, true)}>
                                                Poista
                                            </button>
                                        )}
                                    </div>
                                    <hr />
                                </div>
                            ))}
                            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 text-uppercase inline-flex items-center mt-3" type="button" onClick={() => addItem(true)}>
                                <FaPlus className="mr-2" />
                                <span>Lisää Vaihe</span>
                            </button>
                        </div>
                    </FormWizard.TabContent>

                    <FormWizard.TabContent title="Lataa kuva" icon={<FaRegImages />}>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(event) => onImageChange(event)}
                            required
                        />
                    </FormWizard.TabContent>

                    <FormWizard.TabContent title="Viimeistely" icon={<FaFlagCheckered />}>
                        <div className="flex flex-column" style={{maxWidth: "920px"}}>
                            <div className="flex flex-column my-4">
                                <p className="mb-2">Käyttäjämme voivat rajata hakutuloksista allergeenejä sisältävät reseptit pois.<br />Ole hyvä ja merkkaa tämän reseptin mahdolliset allergeenit:</p>
                                <Select 
                                    options={allergyItems} 
                                    className="my-1" 
                                    onChange={(event) => setFormData({...formData, allergens: event})} 
                                    defaultValue={allergens} 
                                    isClearable={true} 
                                    placeholder="Allergeenit"
                                    isMulti
                                    closeMenuOnSelect={false}
                                    noOptionsMessage={() => "Ei tuloksia"}
                                />
                            </div>

                            <div className="flex flex-column my-4">
                                <p className="mb-2">Käyttäjämme voivat myös määrittää ruokavalioihin soveltuvia reseptejä.<br />Ole hyvä ja merkitse tämän reseptin avainsanat.</p>
                                <Select 
                                    options={dietItems} 
                                    className="my-1" 
                                    onChange={(event) => setFormData({...formData, tags: event})} 
                                    defaultValue={tags} 
                                    isClearable={true} 
                                    placeholder="Avainsanat"
                                    isMulti
                                    closeMenuOnSelect={false}
                                    noOptionsMessage={() => "Ei tuloksia"}
                                />
                            </div>
                        </div>
                    </FormWizard.TabContent>
                </FormWizard>
            </div>
        </div>
    );
};

export default SendRecipePage;