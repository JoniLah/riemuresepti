import { useState } from 'react';
import axios from 'axios';

const SendRecipePage = () => {
    const [formData, setFormData] = useState({
        title: "",
        imgPath: "",
        time: "",
        portions: 1,
        brief: "",
        ingredients: [{ name: "", amount: "", unit: "" }],
        instructions: [{ stepNumber: 1, description: "" }],
        type: ""
    });
    const [imageFile, setImageFile] = useState(null);
    const { title, imgPath, time, portions, ingredients, instructions, brief, type } = formData;

    const onImageChange = (event) => {
        const file = event.target.files[0];
        setImageFile(file);
    };

    const onSubmit = async (event) => {
        event.preventDefault();

        console.log(formData);

        try {
            // Image
            const imageData = new FormData();
            imageData.append('image', imageFile);
            const imageConfig = {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            };
            const imageResponse = await axios.post("http://localhost:5000/api/upload/upload", imageData, imageConfig);
            const imgPath = imageResponse.data.filePath;
    
            // Recipe
            const newRecipe = {
                title, imgPath, time, portions, ingredients, instructions, brief, type
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
        if (isInstruction || isIngredient) {
            const newData = isInstruction ? [...instructions] : [...ingredients];

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
            <h1 className="d-flex justify-content-center py-3">Lähetä resepti!</h1>
            <form type="post" onSubmit={(event) => onSubmit(event)} className="send-recipe-form">
                <div className="d-flex flex-row justify-content-center w-100">
                    <div className="d-flex justify-content-center flex-column" style={{width: "320px"}}>
                        <input type="text" placeholder="Aterian nimi" name="title" onChange={(event) => onChange(event, 1, 'title')} required />
                        <textarea placeholder="Lyhyt kuvaus" name="brief" rows="5" onChange={(event) => onChange(event, 1, 'brief')} maxLength="500" required></textarea>
                        <input type="text" placeholder="Valmistusaika" name="time" onChange={(event) => onChange(event, 1, 'time')} required />
                        <div>
                            <input type="number" min="1" placeholder="Annoskoko" name="portions" onChange={(event) => onChange(event, 1, 'portions')} required /> annosta
                        </div>
                        <input type="text" placeholder="Ruokalaji" name="type" onChange={(event) => onChange(event, 1, 'type')} />
                        <div>
                            <h3>Ainekset</h3>
                            {ingredients.map((ingredient, index) => (
                                <div key={index}>
                                    <input
                                        type="text"
                                        placeholder="Aineksen nimi"
                                        name="name"
                                        value={ingredient.name || ""}
                                        onChange={(event) => onChange(event, index, 'name', false, true)}
                                        required
                                    />
                                    <input
                                        type="number"
                                        placeholder="Määrä"
                                        name="amount"
                                        value={ingredient.amount || ""}
                                        onChange={(event) => onChange(event, index, 'amount', false, true)}
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Yksikkö"
                                        name="unit"
                                        value={ingredient.unit || ""}
                                        onChange={(event) => onChange(event, index, 'unit', false, true)}
                                        required
                                    />
                                    {index > 0 && (
                                        <button type="button" onClick={() => removeItem(index, false)}>
                                            Poista
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button type="button" onClick={() => addItem(false)}>
                                Lisää Aines
                            </button>
                        </div>

                        <div>
                            <h3>Valmistusohjeet</h3>
                            {instructions.map((instruction, index) => (
                                <div key={index}>
                                    <input
                                        type="number"
                                        placeholder="Vaihe"
                                        name="stepNumber"
                                        value={instruction.stepNumber}
                                        onChange={(event) => onChange(event, index, 'stepNumber', true)}
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Kuvaus"
                                        name="description"
                                        value={instruction.description}
                                        onChange={(event) => onChange(event, index, 'description', true)}
                                        required
                                    />
                                    {index > 0 && (
                                        <button type="button" onClick={() => removeItem(index, true)}>
                                            Poista
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button type="button" onClick={() => addItem(true)}>
                                Lisää Vaihe
                            </button>
                        </div>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(event) => onImageChange(event)}
                            required
                        />
                        <button type="submit">Lähetä</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SendRecipePage;