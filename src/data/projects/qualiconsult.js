export const qualiconsultProject = {
  title: "Assistant Qualiconsult",
  description: "Outil interne React de génération automatique de templates Word à partir des données JSON Daxium — utilisé en production chez QUALICONSULT Sécurité.",
  longDescription: "Application React métier développée pour automatiser la production de rapports d'audit. Les inspecteurs saisissent leurs données dans des formulaires Daxium (no-code) ; l'assistant parse les réponses JSON, mappe les champs sur des templates Word prédéfinis et génère les documents prêts à signer. Réduction significative du temps de traitement post-visite.",
  features: [
    {
      name: "Génération de templates Word",
      interface: {
        type: "description",
        content: "Interface de sélection du type de rapport (CEE, Sécurité Incendie, COFRAC). Aperçu des champs mappés avant génération. Téléchargement direct du fichier .docx en un clic."
      },
      code: {
        type: "snippet",
        language: "javascript",
        description: "useWordTemplate — mapping des champs Daxium sur les placeholders du template, génération du .docx via la lib docx et téléchargement navigateur.",
        snippet: `// hooks/useWordTemplate.js
import { useCallback } from 'react';
import { Document, Paragraph, TextRun, Packer } from 'docx';

const FIELD_MAPPING = {
  date_visite:    'DATE_VISITE',
  nom_client:     'NOM_CLIENT',
  adresse:        'ADRESSE_CHANTIER',
  type_travaux:   'TYPE_TRAVAUX',
  observations:   'OBSERVATIONS',
  inspecteur:     'NOM_INSPECTEUR',
};

export const useWordTemplate = (templateId) => {
  const generateDocument = useCallback(async (daxiumData) => {
    const sections = Object.entries(daxiumData.fields)
      .filter(([key]) => FIELD_MAPPING[key])
      .map(([key, value]) => ({
        placeholder: FIELD_MAPPING[key],
        value: String(value ?? '—'),
      }));

    const doc = new Document({
      sections: [{
        children: sections.map(({ placeholder, value }) =>
          new Paragraph({
            children: [
              new TextRun({ text: \`\${placeholder} : \`, bold: true }),
              new TextRun(value),
            ],
          })
        ),
      }],
    });

    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = \`rapport_\${templateId}_\${Date.now()}.docx\`;
    link.click();
    URL.revokeObjectURL(url);
  }, [templateId]);

  return { generateDocument };
};`
      }
    },
    {
      name: "Parser Daxium JSON",
      interface: {
        type: "description",
        content: "Les formulaires Daxium renvoient une structure JSON propriétaire avec tableaux de champs. Le parser normalise ces données en un objet plat utilisable par le générateur de template."
      },
      code: {
        type: "snippet",
        language: "javascript",
        description: "parseDaxiumResponse — normalisation du JSON Daxium : clés snake_case, conversion des dates, extraction des pièces jointes.",
        snippet: `// utils/parseDaxiumResponse.js
export const parseDaxiumResponse = (rawResponse) => {
  const { data, metadata } = rawResponse;

  return {
    id: data.id,
    type: metadata.formType,
    fields: data.fields.reduce((acc, field) => {
      // Normalise les labels en clés snake_case sans accents
      const key = field.label
        .toLowerCase()
        .replace(/\\s+/g, '_')
        .normalize('NFD')
        .replace(/[\\u0300-\\u036f]/g, '');

      acc[key] = field.type === 'date'
        ? new Date(field.value).toLocaleDateString('fr-FR')
        : field.value;

      return acc;
    }, {}),
    attachments: (data.attachments ?? []).map(att => ({
      name: att.filename,
      url: att.url,
      type: att.mimeType,
    })),
    createdAt: new Date(metadata.createdAt),
  };
};`
      }
    },
    {
      name: "Webhooks & Automatisation",
      interface: {
        type: "description",
        content: "Les soumissions de formulaires Daxium déclenchent un webhook HTTP vers le back Node.js. L'assistant reçoit la payload, valide la signature, parse les données et déclenche la génération automatique du rapport."
      },
      code: {
        type: "snippet",
        language: "javascript",
        description: "Handler webhook Daxium — validation de signature HMAC, parsing de la payload, déclenchement de la génération de rapport.",
        snippet: `// server/webhooks/daxiumHandler.js
const crypto = require('crypto');

const validateSignature = (payload, signature, secret) => {
  const expected = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  );
};

module.exports = async (req, res) => {
  const signature = req.headers['x-daxium-signature'];

  if (!validateSignature(req.body, signature, process.env.DAXIUM_SECRET)) {
    return res.status(401).json({ error: 'Signature invalide' });
  }

  const parsed = parseDaxiumResponse(req.body);

  await generateAndStore({
    templateId: parsed.type,
    data: parsed,
    userId: req.body.metadata.userId,
  });

  res.status(200).json({ received: true, id: parsed.id });
};`
      }
    }
  ],
  technologies: ["React", "Node.js", "Webhooks", "Daxium", "docx", "JavaScript"]
};
