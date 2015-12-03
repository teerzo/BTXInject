function LoadObjectList()
{
    var object_list = [   
    {
        "name": "Abdominal_External_Oblique_Muscle",
        "type": ".obj",
        "path": "obj/Whole/seperated/Abdominal_External_Oblique_Muscle",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Abductor_Digiti_Minimi_Left1",
        "type": ".obj",
        "path": "obj/Whole/seperated/Abductor_Digiti_Minimi_Left1",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Abductor_Digiti_Minimi_Right",
        "type": ".obj",
        "path": "obj/Whole/seperated/Abductor_Digiti_Minimi_Right",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Abductor_Hallucis_Muscle_Left1",
        "type": ".obj",
        "path": "obj/Whole/seperated/Abductor_Hallucis_Muscle_Left1",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Abductor_Hallucis_Muscle_Right",
        "type": ".obj",
        "path": "obj/Whole/seperated/Abductor_Hallucis_Muscle_Right",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Adductor_Brevis_Muscle_Left1",
        "type": ".obj",
        "path": "obj/Whole/seperated/Adductor_Brevis_Muscle_Left1",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Adductor_Brevis_Muscle_Right",
        "type": ".obj",
        "path": "obj/Whole/seperated/Adductor_Brevis_Muscle_Right",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Adductor_Longus_Muscle_Left1",
        "type": ".obj",
        "path": "obj/Whole/seperated/Adductor_Longus_Muscle_Left1",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Adductor_Longus_Muscle_Right",
        "type": ".obj",
        "path": "obj/Whole/seperated/Adductor_Longus_Muscle_Right",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Adductor_Magnus_Muscle_Left1",
        "type": ".obj",
        "path": "obj/Whole/seperated/Adductor_Magnus_Muscle_Left1",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Adductor_Magnus_Muscle_Right",
        "type": ".obj",
        "path": "obj/Whole/seperated/Adductor_Magnus_Muscle_Right",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Auricular_Anterior_Muscle_Left1",
        "type": ".obj",
        "path": "obj/Whole/seperated/Auricular_Anterior_Muscle_Left1",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Auricular_Anterior_Muscle_Right",
        "type": ".obj",
        "path": "obj/Whole/seperated/Auricular_Anterior_Muscle_Right",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Bicep_Femoris_Muscle_Left2",
        "type": ".obj",
        "path": "obj/Whole/seperated/Bicep_Femoris_Muscle_Left2",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
     {
        "name": "Bicep_Femoris_Muscle_Left3",
        "type": ".obj",
        "path": "obj/Whole/seperated/Bicep_Femoris_Muscle_Left3",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Bicep_Femoris_Muscle_Right",
        "type": ".obj",
        "path": "obj/Whole/seperated/Bicep_Femoris_Muscle_Right",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Bicep_Femoris_Muscle_Right1",
        "type": ".obj",
        "path": "obj/Whole/seperated/Bicep_Femoris_Muscle_Right1",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Biceps_Brachii_Left1",
        "type": ".obj",
        "path": "obj/Whole/seperated/Biceps_Brachii_Left1",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Biceps_Brachii_Right",
        "type": ".obj",
        "path": "obj/Whole/seperated/Biceps_Brachii_Right",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Biceps_Femoris_Muscle_Left1",
        "type": ".obj",
        "path": "obj/Whole/seperated/Biceps_Femoris_Muscle_Left1",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Biceps_Femoris_Muscle_Right",
        "type": ".obj",
        "path": "obj/Whole/seperated/Biceps_Femoris_Muscle_Right",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Brachioradialis_Muscle_Left1",
        "type": ".obj",
        "path": "obj/Whole/seperated/Brachioradialis_Muscle_Left1",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Brachioradialis_Muscle_Right",
        "type": ".obj",
        "path": "obj/Whole/seperated/Brachioradialis_Muscle_Right",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Buccinator_Muscle_Left1",
        "type": ".obj",
        "path": "obj/Whole/seperated/Buccinator_Muscle_Left1",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Buccinator_Muscle_Right",
        "type": ".obj",
        "path": "obj/Whole/seperated/Buccinator_Muscle_Right",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Corrugator_Supercilii_Muscle_Left1",
        "type": ".obj",
        "path": "obj/Whole/seperated/Corrugator_Supercilii_Muscle_Left1",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Corrugator_Supercilii_Muscle_Right",
        "type": ".obj",
        "path": "obj/Whole/seperated/Corrugator_Supercilii_Muscle_Right",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Deltoideus_Muscle_Left1",
        "type": ".obj",
        "path": "obj/Whole/seperated/Deltoideus_Muscle_Left1",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Deltoideus_Muscle_Right",
        "type": ".obj",
        "path": "obj/Whole/seperated/Deltoideus_Muscle_Right",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Depressor_Anguli_Oris_Muscle_Right",
        "type": ".obj",
        "path": "obj/Whole/seperated/Depressor_Anguli_Oris_Muscle_Right",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Depressor_Anguli_Oris_Muscle_Right1",
        "type": ".obj",
        "path": "obj/Whole/seperated/Depressor_Anguli_Oris_Muscle_Right1",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Depressor_Labii_Inferioris_Muscle_Right",
        "type": ".obj",
        "path": "obj/Whole/seperated/Depressor_Labii_Inferioris_Muscle_Right",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Depressor_Labii_Inferioris_Muscle_Right1",
        "type": ".obj",
        "path": "obj/Whole/seperated/Depressor_Labii_Inferioris_Muscle_Right1",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Depressor_Septi_Nasi_uscle",
        "type": ".obj",
        "path": "obj/Whole/seperated/Depressor_Septi_Nasi_uscle",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Depressor_Septi_Nasi_uscle1",
        "type": ".obj",
        "path": "obj/Whole/seperated/Depressor_Septi_Nasi_uscle1",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Depressor_Supercilii_Muscle_Left1",
        "type": ".obj",
        "path": "obj/Whole/seperated/Depressor_Supercilii_Muscle_Left1",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Depressor_Supercilii_Muscle_Right",
        "type": ".obj",
        "path": "obj/Whole/seperated/Depressor_Supercilii_Muscle_Right",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Digastric_Muscle_Left1",
        "type": ".obj",
        "path": "obj/Whole/seperated/Digastric_Muscle_Left1",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Digastric_Muscle_Right",
        "type": ".obj",
        "path": "obj/Whole/seperated/Digastric_Muscle_Right",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Extensor_Digitorum_Longus_Muscle_Left1",
        "type": ".obj",
        "path": "obj/Whole/seperated/Extensor_Digitorum_Longus_Muscle_Left1",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Extensor_Digitorum_Longus_Muscle_Right",
        "type": ".obj",
        "path": "obj/Whole/seperated/Extensor_Digitorum_Longus_Muscle_Right",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Extensor_Digitorum_Muscle_Left1",
        "type": ".obj",
        "path": "obj/Whole/seperated/Extensor_Digitorum_Muscle_Left1",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Extensor_Digitorum_Muscle_Right",
        "type": ".obj",
        "path": "obj/Whole/seperated/Extensor_Digitorum_Muscle_Right",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Extensor_Hallucis_Brevis_Muscle_01_Left1",
        "type": ".obj",
        "path": "obj/Whole/seperated/Extensor_Hallucis_Brevis_Muscle_01_Left1",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Extensor_Hallucis_Brevis_Muscle_01_Right",
        "type": ".obj",
        "path": "obj/Whole/seperated/Extensor_Hallucis_Brevis_Muscle_01_Right",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Extensor_Hallucis_Brevis_Muscle_02_Left1",
        "type": ".obj",
        "path": "obj/Whole/seperated/Extensor_Hallucis_Brevis_Muscle_02_Left1",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Extensor_Hallucis_Brevis_Muscle_02_Right",
        "type": ".obj",
        "path": "obj/Whole/seperated/Extensor_Hallucis_Brevis_Muscle_02_Right",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Extensor_Hallucis_Brevis_Muscle_03_Left1",
        "type": ".obj",
        "path": "obj/Whole/seperated/Extensor_Hallucis_Brevis_Muscle_03_Left1",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Extensor_Hallucis_Brevis_Muscle_03_Right",
        "type": ".obj",
        "path": "obj/Whole/seperated/Extensor_Hallucis_Brevis_Muscle_03_Right",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Extensor_Hallucis_Brevis_Muscle_04_Left1",
        "type": ".obj",
        "path": "obj/Whole/seperated/Extensor_Hallucis_Brevis_Muscle_04_Left1",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Extensor_Hallucis_Brevis_Muscle_04_Right",
        "type": ".obj",
        "path": "obj/Whole/seperated/Extensor_Hallucis_Brevis_Muscle_04_Right",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Extensor_Hallucis_Longus_Muscle_Left1",
        "type": ".obj",
        "path": "obj/Whole/seperated/Extensor_Hallucis_Longus_Muscle_Left1",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Extensor_Hallucis_Longus_Muscle_Right",
        "type": ".obj",
        "path": "obj/Whole/seperated/Extensor_Hallucis_Longus_Muscle_Right",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Eye_Ball_Outer2",
        "type": ".obj",
        "path": "obj/Whole/seperated/Eye_Ball_Outer2",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Eye_Ball_Outer3",
        "type": ".obj",
        "path": "obj/Whole/seperated/Eye_Ball_Outer3",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Flexor_Carpi_Radialis_Muscle_Left1",
        "type": ".obj",
        "path": "obj/Whole/seperated/Flexor_Carpi_Radialis_Muscle_Left1",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Flexor_Carpi_Radialis_Muscle_Right",
        "type": ".obj",
        "path": "obj/Whole/seperated/Flexor_Carpi_Radialis_Muscle_Right",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Flexor_Digitorum_Brevis_Muscle_01_Left1",
        "type": ".obj",
        "path": "obj/Whole/seperated/Flexor_Digitorum_Brevis_Muscle_01_Left1",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Flexor_Digitorum_Brevis_Muscle_01_Right",
        "type": ".obj",
        "path": "obj/Whole/seperated/Flexor_Digitorum_Brevis_Muscle_01_Right",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Flexor_Digitorum_Brevis_Muscle_02_Left1",
        "type": ".obj",
        "path": "obj/Whole/seperated/Flexor_Digitorum_Brevis_Muscle_02_Left1",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
     {
        "name": "Flexor_Digitorum_Brevis_Muscle_02_Right",
        "type": ".obj",
        "path": "obj/Whole/seperated/Flexor_Digitorum_Brevis_Muscle_02_Right",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
     {
        "name": "Flexor_Digitorum_Brevis_Muscle_03_Left1",
        "type": ".obj",
        "path": "obj/Whole/seperated/Flexor_Digitorum_Brevis_Muscle_03_Left1",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Flexor_Digitorum_Brevis_Muscle_03_Right",
        "type": ".obj",
        "path": "obj/Whole/seperated/Flexor_Digitorum_Brevis_Muscle_03_Right",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
     {
        "name": "Flexor_Digitorum_Brevis_Muscle_04_Left1",
        "type": ".obj",
        "path": "obj/Whole/seperated/Flexor_Digitorum_Brevis_Muscle_04_Left1",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Flexor_Digitorum_Brevis_Muscle_04_Right",
        "type": ".obj",
        "path": "obj/Whole/seperated/Flexor_Digitorum_Brevis_Muscle_04_Right",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Flexor_Digitorum_Longus_Muscle_Left1",
        "type": ".obj",
        "path": "obj/Whole/seperated/Flexor_Digitorum_Longus_Muscle_Left1",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Flexor_Digitorum_Longus_Muscle_Right",
        "type": ".obj",
        "path": "obj/Whole/seperated/Flexor_Digitorum_Longus_Muscle_Right",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Flexor_Hallucis_Longus_Muscle_Left1",
        "type": ".obj",
        "path": "obj/Whole/seperated/Flexor_Hallucis_Longus_Muscle_Left1",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Flexor_Hallucis_Longus_Muscle_Right",
        "type": ".obj",
        "path": "obj/Whole/seperated/Flexor_Hallucis_Longus_Muscle_Right",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Frontalis_Muscle_Left",
        "type": ".obj",
        "path": "obj/Whole/seperated/Frontalis_Muscle_Left",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Gastrocnemius_Muscle_Left1",
        "type": ".obj",
        "path": "obj/Whole/seperated/Gastrocnemius_Muscle_Left1",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Gastrocnemius_Muscle_Right",
        "type": ".obj",
        "path": "obj/Whole/seperated/Gastrocnemius_Muscle_Right",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Gluteus_Maximus_Muscle_Left1",
        "type": ".obj",
        "path": "obj/Whole/seperated/Gluteus_Maximus_Muscle_Left1",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Gluteus_Maximus_Muscle_Right",
        "type": ".obj",
        "path": "obj/Whole/seperated/Gluteus_Maximus_Muscle_Right",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Gluteus_Medius_Muscle_Left1",
        "type": ".obj",
        "path": "obj/Whole/seperated/Gluteus_Medius_Muscle_Left1",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Gluteus_Medius_Muscle_Right",
        "type": ".obj",
        "path": "obj/Whole/seperated/Gluteus_Medius_Muscle_Right",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Gluteus_Minimus_Muscle_Left1",
        "type": ".obj",
        "path": "obj/Whole/seperated/Gluteus_Minimus_Muscle_Left1",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Gluteus_Minimus_Muscle_Right",
        "type": ".obj",
        "path": "obj/Whole/seperated/Gluteus_Minimus_Muscle_Right",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Gracilis_Muscle_Left1",
        "type": ".obj",
        "path": "obj/Whole/seperated/Gracilis_Muscle_Left1",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "Gracilis_Muscle_Right",
        "type": ".obj",
        "path": "obj/Whole/seperated/Gracilis_Muscle_Right",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "HandMuscle_Left1",
        "type": ".obj",
        "path": "obj/Whole/seperated/HandMuscle_Left1",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "HandMuscle_Left2",
        "type": ".obj",
        "path": "obj/Whole/seperated/HandMuscle_Left2",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "HandMuscle_Left3",
        "type": ".obj",
        "path": "obj/Whole/seperated/HandMuscle_Left3",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    {
        "name": "HandMuscle_Left4",
        "type": ".obj",
        "path": "obj/Whole/seperated/HandMuscle_Left4",
        "diffuse": "obj/Whole/seperated/muscles.png"
    },
    ];
    return object_list;
 }
