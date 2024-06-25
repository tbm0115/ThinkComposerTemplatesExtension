export const thinkComposerModel = [
    {
        name: 'Attachment',
        ancestor: 'ContainedDetail',
        properties: {
            'AssignedDesignator': { type: 'Assignment<DetailDesignator>', summary: 'Attachment content designator' },
            'Designator': { type: 'AttachmentDetailDesignator', summary: 'Attachment designator' },
            'Kind': { type: 'ModelDefinition', summary: 'Returns the kind of this detail' },
            'MimeType': { type: 'String', summary: 'Detected MIME-Type when the attachment was loaded' },
            'Source': { type: 'String', summary: 'Location-of/route-to the resource origin' }
        }
    },
    {
        name: 'AssignedDesignator',
        ancestor: 'Assignment<DetailDesignator>',
        properties: {
            // Properties of Assignment<DetailDesignator> can be defined here if necessary
        }
    },
    {
        name: 'AttachmentDetailDesignator',
        ancestor: 'DetailDesignator',
        properties: {
            'Owner': { type: 'Ownership<IdeaDefinition, Idea>', summary: 'Owner of this table detail designator' },
            'SubOwnerFieldDef': { type: 'FieldDefinition', summary: 'Optional Field-Definition sub-owning this detail designator' }
        }
    },
    {
        name: 'Composition',
        ancestor: 'Concept',
        properties: {
            'ActiveView': { type: 'View', summary: 'Active View of the composition' },
            'CompositionDefinitor': { type: 'Domain', summary: 'Domain definition of this Composition' },
            'Pictogram': { type: 'ImageSource', summary: 'Graphic representation of the object' },
            'RootView': { type: 'View', summary: 'Initial and central View of the Composition' },
            'UsedDomains': { type: 'EditableList<Domain>', summary: 'Collection of used Domains in this Composition' },
            'ViewsPrefix': { type: 'String', summary: 'Prefix for naming related views of this document' }
        }
    },
    {
        name: 'Concept',
        ancestor: 'Idea',
        properties: {
            'ConceptDefinitor': { type: 'Assignment<ConceptDefinition>', summary: 'Concept Definition on which this Concept is based' },
            'Pictogram': { type: 'ImageSource', summary: 'Graphic representation of the object' },
            'ConceptVisualRepresentation': { type: 'VisualRepresentation', summary: 'Visually represents a Concept' },
            'RepresentedConcept': { type: 'Concept', summary: 'Represented Concept by this visual element' },
            'AutomaticCreationConceptDef': { type: 'ConceptDefinition', summary: 'Definition of the Concept to be automatically created' },
            'AutomaticCreationPositioningIsRadialized': { type: 'Boolean', summary: 'Indicates to position automatically created Concepts around in a radial (semi elliptical) style' },
            'AutomaticCreationRelationshipDef': { type: 'RelationshipDefinition', summary: 'Definition of the Relationship to associate Concepts with the automatically created ones' }
        }
    },
    {
        name: 'ContainedDetail',
        ancestor: null,
        properties: {
            'IsCustomDetail': { type: 'Boolean', summary: 'Indicates whether this detail is Custom, which means this was not designated at the Idea Definitor, but into a particular Idea' },
            'OwnerIdea': { type: 'Idea', summary: 'Container owning this Contained-Detail' }
        }
    },
    {
        name: 'DetailDesignator',
        ancestor: 'MetaDefinition',
        properties: {
            'Owner': { type: 'Ownership<IdeaDefinition, Idea>', summary: 'Owner of this table detail designator' },
            'SubOwnerFieldDef': { type: 'FieldDefinition', summary: 'Optional Field-Definition sub-owning this detail designator' }
        }
    },
    {
        name: 'Domain',
        ancestor: 'ConceptDefinition',
        properties: {
            'BaseContentRoot': { type: 'Concept', summary: 'Idea owning the Domain\'s predefined base-content (such as Base Tables)' },
            'DefaultTableDef': { type: 'TableDefinition', summary: 'Table-Structure Definition used as the by-default for new Tables' },
            'IdeaClusters': { type: 'EditableList<SimplePresentationElement>', summary: 'Simple clusters for grouping Idea Definitions on palettes (i.e. visually)' },
            'LinkRoleVariants': { type: 'EditableList<SimplePresentationElement>', summary: 'Predefined variants available for Link-Role Definitions (e.g.: Used for declaring Multiplicities/Cardinalities)' },
            'MarkerClusters': { type: 'EditableList<SimplePresentationElement>', summary: 'Simple clusters for grouping Marker Definitions on palettes (i.e. visually)' },
            'OwnerComposition': { type: 'Composition', summary: 'Composition owning this Domain instance' },
            'Pictogram': { type: 'ImageSource', summary: 'Graphic representation of the object' },
            'ViewBackgroundImage': { type: 'ImageSource', summary: 'Image to be initially assigned to the View\'s background. If bigger than 500x500 then it is adjusted to fit in the View, else it is repeated/tiled' }
        }
    },
    {
        name: 'FieldDefinition',
        ancestor: 'MetaDefinition',
        properties: {
            'ContainedTableDesignator': { type: 'TableDetailDesignator', summary: 'If set, stores or references the Table-Structure Definition declaring the type of the Tables contained by the implementing Fields' },
            'ContainedTableIsSingleRecord': { type: 'Boolean', summary: 'Indicates whether the contained-table, if set, has only one record, else is Multi-Record' },
            'HideInDiagram': { type: 'Boolean', summary: 'Indicates that the field values must be hidden in the diagram view' },
            'IsRequired': { type: 'Boolean', summary: 'Indicates whether the field value must be stored or can be let empty (null)' },
            'OwnerTableDef': { type: 'TableDefinition', summary: 'Table-Structure Definition owning this Field Definition' },
            'StorageIndex': { type: 'Int32', summary: 'Actual position, within the table record structure, where the values of this field are located' }
        }
    },
    {
        name: 'FormalElement',
        ancestor: 'UniqueElement',
        properties: {
            'Description': { type: 'String', summary: 'Detailed description (rich) text of the object' },
            'Name': { type: 'String', summary: 'Name or Title of the object' },
            'NameCaption': { type: 'String', summary: 'Gets the Name for single-line display (without new-line characters)' },
            'Summary': { type: 'String', summary: 'Summary of the object' },
            'TechName': { type: 'String', summary: 'Technical-Name of the object. Should be unique. Intended for machine-level usage as code, identifier or name for files/tables/programs' },
            'TechSpec': { type: 'String', summary: 'Technical-Specification of the object. Intended as a machine-level representation for computation (i.e. for use as script, template, formula or other kind of expression)' },
            'Version': { type: 'VersionCard', summary: 'Stores the versioning information of the object, such as Creator, Last-Modifier, dates and version number' }
        }
    },
    {
        name: 'Idea',
        ancestor: 'FormalPresentationElement',
        properties: {
            'AssociatingLinks': { type: 'EditableList<RoleBasedLink>', summary: 'Collection of links which associate this Idea to a Relationship' },
            'BaseKind': { type: 'ModelDefinition', summary: 'Gets the kind (Domain, ConceptDefinition or RelationshipDefinition) of the definitor of this idea final instance type' },
            'CompositeActiveView': { type: 'View', summary: 'Current active view of the composite Idea' },
            'CompositeContentDomain': { type: 'Domain', summary: 'Domain which rules the content of this Idea' },
            'CompositeDepthLevel': { type: 'Int32', summary: 'Gets the level of compositional depth of this Idea' },
            'CompositeIdeas': { type: 'EditableList<Idea>', summary: 'The collection of composing Ideas of this one' },
            'CompositeViews': { type: 'EditableList<View>', summary: 'Views for contained children Ideas when this is composite' },
            'DefinitionIsShared': { type: 'Boolean', summary: 'Indicates whether the assigned Idea definition is Shared (owned by its Domain), or Local (owned by this Idea)' },
            'DescriptiveCaption': { type: 'String', summary: 'Short text describing the Idea' },
            'Details': { type: 'EditableList<ContainedDetail>', summary: 'Collection of contained details' },
            'HasDetailedContent': { type: 'Boolean', summary: 'Indicates whether the Idea has detailed content (tables, attachments or non-internal links)' },
            'IncomingLinks': { type: 'IEnumerable<RoleBasedLink>', summary: 'Links targeting to this Idea' },
            'IsComposite': { type: 'Boolean', summary: 'Indicates whether the Idea is composed of others, else is atomic' },
            'LinkedFrom': { type: 'IEnumerable<Relationship>', summary: 'Incoming Relationships linking-to/whose-target-is this Idea' },
            'LinkingTo': { type: 'IEnumerable<Relationship>', summary: 'Outgoing Relationships linked-from/whose-origin-is this Idea' },
            'MainRepresentator': { type: 'VisualRepresentation', summary: 'Gets the primary Visual Representator of this Idea' },
            'MainSymbol': { type: 'VisualSymbol', summary: 'Gets the Main Symbol of the primary Visual Representator of this Idea' },
            'Markings': { type: 'EditableList<MarkerAssignment>', summary: 'Collection of assigned markers' },
            'OppositeOriginLinks': { type: 'IEnumerable<RoleBasedLink>', summary: 'Links, opposite to incoming-links and of the same Relationships, pointed from origin Ideas' },
            'OppositeTargetLinks': { type: 'IEnumerable<RoleBasedLink>', summary: 'Links, opposite to outgoing-links and of the same Relationships, pointing to target Ideas' },
            'OutgoingLinks': { type: 'IEnumerable<RoleBasedLink>', summary: 'Links originating from this Idea' },
            'OwnerComposition': { type: 'Composition', summary: 'Composition owning this Idea' },
            'OwnerContainer': { type: 'Idea', summary: 'Container owning this Idea, which is composing a dominant one' },
            'RelatedFrom': { type: 'IEnumerable<Idea>', summary: 'Ideas pointing to this Idea (through incoming Relationships)' },
            'RelatingTo': { type: 'IEnumerable<Idea>', summary: 'Ideas pointed by this Idea (through outgoing Relationships)' },
            'SelfKind': { type: 'ModelDefinition', summary: 'Gets the kind (Composition, Concept or Relationship) of this idea final instance type' },
            'This': { type: 'Idea', summary: 'Returns this Idea (To support access to Details thru indexer)' },
            'VisualRepresentators': { type: 'EditableList<VisualRepresentation>', summary: 'Collection of visual representations for this Idea' }
        }
    },
    {
        name: 'IdeaDefinition',
        ancestor: 'MetaDefinition',
        properties: {
            'AutomaticGroupedConceptDef': { type: 'ConceptDefinition', summary: 'Definition of the Concept to be automatically created onto an appended Group Region/Line' },
            'CanAutomaticallyCreateGroupedConcepts': { type: 'Boolean', summary: 'Indicates whether the Ideas of this type will automatically create grouped Concepts when linking a Relationship into an appended Group Region/Line' },
            'CanAutomaticallyCreateRelatedConcepts': { type: 'Boolean', summary: 'Indicates whether the Ideas of this type will automatically create related Concepts in editing (by pressing [Enter], [Tab] or dropping Idea Definitions over them)' },
            'CanGroupIntersectingObjects': { type: 'Boolean', summary: 'Indicates whether the Ideas of this type will group objects intersecting its symbol or Group Region' },
            'CompositeContentDomain': { type: 'Domain', summary: 'If set, indicates the Domain which rules the content of the defined Idea' },
            'ConceptDefinitions': { type: 'EditableList<ConceptDefinition>', summary: 'Collection of Concept definitions which are part of this one' },
            'ClusterKey': { type: 'FormalPresentationElement', summary: 'Cluster to which this Idea-Definition is associated (used for better organization/grouping of the Definitions)' },
            'CustomFieldsTableDef': { type: 'TableDefinition', summary: 'Definition of Custom-Fields (based on a Table-Structure Definition)' },
            'DefKind': { type: 'ModelDefinition', summary: 'Gets the kind (Domain, ConceptDefinition or RelationshipDefinition) of this idea definition final instance type' },
            'DetailDesignators': { type: 'EditableList<DetailDesignator>', summary: 'Collection of Detail Designators declared for this Idea definition' },
            'HasGroupLine': { type: 'Boolean', summary: 'Indicates whether the defined Ideas are created with a Group Line complement (like a \'life line\') appended' },
            'HasGroupRegion': { type: 'Boolean', summary: 'Indicates whether the defined Ideas are created with a Group Region complement (a boundary) appended' },
            'IsComposable': { type: 'Boolean', summary: 'Indicates whether the defined Ideas can be composed of others in a whole view/diagram contained inside' },
            'IsVersionable': { type: 'Boolean', summary: 'Indicates whether the defined Ideas can maintain versioning information' },
            'OwnerDefinitor': { type: 'IdeaDefinition', summary: 'References the composite Idea definition owning this one' },
            'Pictogram': { type: 'ImageSource', summary: 'Graphic representation of the object' },
            'PreciseConnectByDefault': { type: 'Boolean', summary: 'Indicates to connect from/to precise aimed positions inside the Symbol, by default, else from/to the Symbol center' },
            'RelationshipDefinitions': { type: 'EditableList<RelationshipDefinition>', summary: 'Collection of Relationship definitions which are part of this one' },
            'RepresentativeShape': { type: 'String', summary: 'Shape illustrating the definition, to be exposed as the visual symbol of the represented Ideas' },
            'TableDefinitions': { type: 'EditableList<TableDefinition>', summary: 'Collection of declared Table-Structure Definitions' }
        }
    },
    {
        name: 'Link',
        ancestor: 'ContainedDetail',
        properties: {
            'AssignedDesignator': { type: 'Assignment<DetailDesignator>', summary: 'Link assigned designator' },
            'Designator': { type: 'LinkDetailDesignator', summary: 'Internal-Link assigned designator' },
            'Kind': { type: 'ModelDefinition', summary: 'Returns the kind of this detail' },
            'TargetAddress': { type: 'String', summary: 'Address of the resource' }
        }
    },
    {
        name: 'LinkRoleDefinition',
        ancestor: 'MetaDefinition',
        properties: {
            'AllowedVariants': { type: 'EditableList<SimplePresentationElement>', summary: 'Allowed link-role variants and related plug style for the relationship link role' },
            'AssociableIdeaDefs': { type: 'EditableList<IdeaDefinition>', summary: 'List of linkable idea definitions. If none is assigned, then all can be linked' },
            'MaxConnections': { type: 'UInt32', summary: 'Number of maximum Ideas that can be linked by the role. Zero for unlimited. The default is one' },
            'OwnerRelationshipDef': { type: 'RelationshipDefinition', summary: 'Relationship definition owning this link role definition' },
            'Pictogram': { type: 'ImageSource', summary: 'Graphic representation of the object' },
            'RelatedIdeasAreOrdered': { type: 'Boolean', summary: 'Indicates whether the related Ideas for the relationship link role are free or follows an order' }
        }
    },
    {
        name: 'MarkerAssignment',
        ancestor: null,
        properties: {
            'Descriptor': { type: 'SimplePresentationElement', summary: 'Optional descriptor for the Marker' }
        }
    },
    {
        name: 'MetaDefinition',
        ancestor: 'FormalElement',
        properties: {
            'MetaId': { type: 'Int32', summary: 'Simple identifier for indirectly associate created objects with definitions' }
        }
    },
    {
        name: 'ModelDefinition',
        ancestor: null,
        properties: {
            'Name': { type: 'Int32', summary: 'User-level name of the defined object' },
            'TechName': { type: 'String', summary: 'Name of the defined object' },
            'Summary': { type: 'String', summary: 'User-level description of the defined object' }
        }
    },
    {
        name: 'Relationship',
        ancestor: 'Idea',
        properties: {
            'DescriptiveCaption': { type: 'String', summary: 'Short text describing Relationship links' },
            'IsAutoReference': { type: 'Boolean', summary: 'Indicates whether this represents an auto-reference for the connected Idea (non-exclusive). This means that can exists links pointing from/to another Ideas' },
            'IsAutoReferenceExclusive': { type: 'Boolean', summary: 'Indicates whether this represents an exclusive auto-reference for the connected Idea. This means that all links points from/to the same Idea' },
            'Links': { type: 'EditableList<RoleBasedLink>', summary: 'Collection of implemented Links' },
            'OriginIdeas': { type: 'IEnumerable<Idea>', summary: 'Gets the Ideas from which this Relationship is Originated (includes Participants)' },
            'OriginLinks': { type: 'IEnumerable<RoleBasedLink>', summary: 'Links associating the origin (or participant) Ideas' },
            'RelationshipDefinitor': { type: 'Assignment<RelationshipDefinition>', summary: 'Relationship Definition on which this Relationship is based' },
            'TargetIdeas': { type: 'IEnumerable<Idea>', summary: 'Gets the Ideas to which this Relationship is Targeted' },
            'TargetLinks': { type: 'IEnumerable<RoleBasedLink>', summary: 'Links associating the target Ideas' }
        }
    },
    {
        name: 'RelationshipDefinition',
        ancestor: 'IdeaDefinition',
        properties: {
            'AncestorRelationshipDef': { type: 'RelationshipDefinition', summary: 'References the ancestor Relationship definition of this one' },
            'HideCentralSymbolWhenSimple': { type: 'Boolean', summary: 'Hides the Central/Main-Symbol when the Relationship is defined as Simple' },
            'IsDirectional': { type: 'Boolean', summary: 'Indicates whether this relationship if from an origin to a target, else is between equivalent participants' },
            'IsSimple': { type: 'Boolean', summary: 'Indicates that only one target and one source Links can be established' },
            'OriginOrParticipantLinkRoleDef': { type: 'LinkRoleDefinition', summary: 'Definition for the Origin/Source link role. This is the participant role in a non-directional relationship' },
            'Pictogram': { type: 'ImageSource', summary: 'Graphic representation of the object' },
            'ShowNameIfHidingCentralSymbol': { type: 'Boolean', summary: 'Indicates to show the Relationship name when hiding the Central/Main-Symbol' },
            'TargetLinkRoleDef': { type: 'LinkRoleDefinition', summary: 'Definition for the Target/Destination link role. This has no use in a non-directional relationship' }
        }
    },
    {
        name: 'ResourceLink',
        ancestor: 'Link',
        properties: {
            'AssignedDesignator': { type: 'Assignment<DetailDesignator>', summary: 'Resource Link content designator' },
            'Designator': { type: 'LinkDetailDesignator', summary: 'Resource-Link designator' },
            'TargetAddress': { type: 'String', summary: 'Address of the resource' },
            'TargetLocation': { type: 'String', summary: 'Location-of/route-to the resource' }
        }
    },
    {
        name: 'RoleBasedLink',
        ancestor: 'UniqueElement',
        properties: {
            'AssociatedIdea': { type: 'Idea', summary: 'References the associated Idea of this link' },
            'Descriptor': { type: 'SimplePresentationElement', summary: 'Optional description of this link' },
            'OwnerRelationship': { type: 'Relationship', summary: 'References the owning Relationship' },
            'RoleDefinitor': { type: 'LinkRoleDefinition', summary: 'Related Link-Role Definition' },
            'RoleVariant': { type: 'SimplePresentationElement', summary: 'Indicates the Link-Role Variant for this link' }
        }
    },
    {
        name: 'SimpleElement',
        ancestor: null,
        properties: {
            'Name': { type: 'String', summary: 'Name or Title of the object' },
            'NameCaption': { type: 'String', summary: 'Gets the Name for single-line display (without new-line characters)' },
            'Summary': { type: 'String', summary: 'Summary of the object' },
            'TechName': { type: 'String', summary: 'Technical-Name of the object. Should be unique. Intended for machine-level usage as code, identifier or name for files/tables/programs' },
            'TechSpec': { type: 'String', summary: 'Technical-Specification of the object. Intended as a machine-level representation for computation (i.e. for use as script, template, formula or other kind of expression)' }
        }
    },
    {
        name: 'Table',
        ancestor: 'ContainedDetail',
        properties: {
            'AssignedDesignator': { type: 'Assignment<DetailDesignator>', summary: 'Table designator' },
            'Count': { type: 'Int32', summary: 'Returns the count of contained Table-Records' },
            'Definition': { type: 'TableDefinition', summary: 'Gets the designated Table-Structure Definition' },
            'Designator': { type: 'TableDetailDesignator', summary: 'Table designator' },
            'Kind': { type: 'ModelDefinition', summary: 'Returns the kind of this detail' },
            'Records': { type: 'EditableList<TableRecord>', summary: 'Collection of records belonging to this Table' },
            'RecordsLabel': { type: 'String', summary: 'Text representation of the Table\'s Records data (only the first 3 records)' }
        }
    },
    {
        name: 'TableDefinition',
        ancestor: 'MetaDefinition',
        properties: {
            'FieldDefinitions': { type: 'EditableList<FieldDefinition>', summary: 'Collection of declared Field definitions of this Table-Structure Definition' },
            'LabelFieldDefs': { type: 'EditableList<FieldDefinition>', summary: 'List of ordered field definitions used as Labels (for title usage)' },
            'OwnerDomain': { type: 'Domain', summary: 'Domain owning this Table-Structure Definition' }
        }
    },
    {
        name: 'TableDetailDesignator',
        ancestor: 'DetailDesignator',
        properties: {
            'ContainedTableSubOwner': { type: 'FieldDefinition', summary: 'If set, references the Field-Definition sub-owner of a field contained Table. IMPORTANT: In this case, the Owner must point to the related Domain' },
            'DeclaringTableDefinition': { type: 'TableDefinition', summary: 'Table-Structure Definition which declares the data structure of this Table' },
            'TableDefIsOwned': { type: 'Boolean', summary: 'Indicates that the Table Definition belongs to the detail\'s owner (not shared)' }
        }
    },
    {
        name: 'TableRecord',
        ancestor: null,
        properties: {
            'Index': { type: 'Int32', summary: 'Index of the record in the owner Table (one based, for users)' },
            'Label': { type: 'String', summary: 'Returns the record\'s Label: Text composed of the fields (definitions) marked as being part of the Label in the Table-Structure Definition' },
            'OwnerTable': { type: 'Table', summary: 'Table owning this table record' }
        }
    },
    {
        name: 'UniqueElement',
        ancestor: null,
        properties: {
            'GlobalId': { type: 'Guid', summary: 'Global unique identifier of the object' }
        }
    },
    {
        name: 'VersionCard',
        ancestor: null,
        properties: {
            'Annotation': { type: 'String', summary: 'Comment in reference to edition activities performed or pending' },
            'Creation': { type: 'DateTime', summary: 'Date-time of the creation' },
            'Creator': { type: 'String', summary: 'Creator user name' },
            'LastModification': { type: 'DateTime', summary: 'Date-time of the last modification' },
            'LastModifier': { type: 'String', summary: 'Last modifier user name' },
            'VersionNumber': { type: 'String', summary: 'Optional manual/external generated version number (i.e: \'major-release.minor-release[.build[.revision]]\')' },
            'VersionSequence': { type: 'Int32', summary: 'Sequential number, starting from one. The real version number' }
        }
    },
    {
        name: 'View',
        ancestor: 'FormalElement',
        properties: {
            'BackgroundImage': { type: 'ImageSource', summary: 'Image to be shown at the Background (behind the diagram sheet, over the background color). If bigger than 500x500 then it is adjusted to fit in the View, else it is repeated/tiled' },
            'GridSize': { type: 'Double', summary: 'Gets or sets the context Grid size (range: 2 to 20 pixels)' },
            'GridUsesLines': { type: 'Boolean', summary: 'Indicates that the context Grid should be based on Lines, else on Points' },
            'IsOpen': { type: 'Boolean', summary: 'Indicates whether the content is presented/expanded or hidden/collapsed' },
            'IsOutlined': { type: 'Boolean', summary: 'Indicates whether the content is presented surrounded by a border' },
            'OwnerCompositeContainer': { type: 'Idea', summary: 'References the Idea Composite Container owning this View' },
            'PageDisplayScale': { type: 'Int32', summary: 'Scaling percentage for displaying the view page' },
            'ShowConceptDefinitionLabels': { type: 'Boolean', summary: 'Indicates whether to display Labels with the Concept Definition name over the Concept' },
            'ShowContextBackground': { type: 'Boolean', summary: 'Indicates whether to display the assigned Background' },
            'ShowContextGrid': { type: 'Boolean', summary: 'Indicates whether to display the assigned Grid' },
            'ShowIndicators': { type: 'Boolean', summary: 'Indicates whether to display Indicators over the Ideas' },
            'ShowLinkRoleDefNameLabels': { type: 'Boolean', summary: 'Indicates whether to display Labels with the Link-Role Definitor name over the Connectors' },
            'ShowLinkRoleDescNameLabels': { type: 'Boolean', summary: 'Indicates whether to display Labels with the Link-Role Descriptor name over the Connectors' },
            'ShowLinkRoleVariantLabels': { type: 'Boolean', summary: 'Indicates whether to display Labels with the Link-Role Variant over the Connectors' },
            'ShowMarkers': { type: 'Boolean', summary: 'Indicates whether to display Markers over the Ideas' },
            'ShowMarkersTitles': { type: 'Boolean', summary: 'Indicates whether to display the Title of the Markers over them' },
            'ShowRelationshipDefinitionLabels': { type: 'Boolean', summary: 'Indicates whether to display Labels with the Relationship Definition name over the Relationship' },
            'ShowSmoothEdges': { type: 'Boolean', summary: 'Indicates whether to show smooth edges for the displayed shapes, else they are displayed sharpened' },
            'SnapToGrid': { type: 'Boolean', summary: 'Indicates whether the positioning of objects should be aligned to grid points' },
            'ViewSize': { type: 'Size', summary: 'Size of the View' },
            'VisualCountOfFloatings': { type: 'Int32', summary: 'Current count of visual floating content' },
            'VisualLevelForBackground': { type: 'Int32', summary: 'Maximum z-order level currently assigned for visual background content' },
            'VisualLevelForRegions': { type: 'Int32', summary: 'Maximum z-order level currently assigned for visual regions content' }
        }
    },
    {
        name: 'VisualComplement',
        ancestor: 'VisualObject',
        properties: {
            'BaseArea': { type: 'Rect', summary: 'Area of the figure' },
            'BaseCenter': { type: 'Point', summary: 'Central position where the figure is displayed around' },
            'BaseHeight': { type: 'Double', summary: 'Height of the figure bounds rectangle area, containing the actual geometry which maybe is not rectangular' },
            'BaseLeft': { type: 'Double', summary: 'Horizontal left position of the figure bounds rectangle area, containing the actual geometry which maybe is not rectangular' },
            'BaseTop': { type: 'Double', summary: 'Vertical top position of the figure bounds rectangle area, containing the actual geometry which maybe is not rectangular' },
            'BaseWidth': { type: 'Double', summary: 'Width of the figure bounds rectangle area, containing the actual geometry which maybe is not rectangular' },
            'Content': { type: 'Object', summary: 'Contained text or image' },
            'Kind': { type: 'SimplePresentationElement', summary: 'Type of Complement implemented' },
            'Target': { type: 'Ownership<View, VisualSymbol>', summary: 'Visual object targeted by this Complement' }
        }
    },
    {
        name: 'VisualConnector',
        ancestor: 'VisualElement',
        properties: {
            'IntermediatePosition': { type: 'Point', summary: 'Intermediate optional position of the connector' },
            'OriginEdgePosition': { type: 'Point', summary: 'Source edge-position of the connector respect the source symbol' },
            'OriginPlug': { type: 'String', summary: 'Gets the plug type code for the origin side' },
            'OriginPosition': { type: 'Point', summary: 'Source position of the connector' },
            'OriginSymbol': { type: 'VisualSymbol', summary: 'Symbol where this Connector originates' },
            'OwnerRelationshipRepresentation': { type: 'RelationshipVisualRepresentation', summary: 'References the owning relationship visual representator' },
            'RepresentedLink': { type: 'RoleBasedLink', summary: 'References the represented Role Based Link' },
            'TargetEdgePosition': { type: 'Point', summary: 'Destination edge-position of the connector respect the target symbol' },
            'TargetPlug': { type: 'String', summary: 'Gets the plug type code for the target side' },
            'TargetPosition': { type: 'Point', summary: 'Destination position of the connector' },
            'TargetSymbol': { type: 'VisualSymbol', summary: 'Symbol pointed by this Connector' }
        }
    },
    {
        name: 'VisualElement',
        ancestor: 'VisualObject',
        properties: {
            'OwnerRepresentation': { type: 'VisualRepresentation', summary: 'References the owning visual representator' }
        }
    },
    {
        name: 'VisualRepresentation',
        ancestor: 'UniqueElement',
        properties: {
            'AreRelatedOriginsShown': { type: 'Boolean', summary: 'Indicates whether the related Origin representations are shown' },
            'AreRelatedTargetsShown': { type: 'Boolean', summary: 'Indicates whether the related Target (and participant) representations are shown' },
            'DisplayingView': { type: 'View', summary: 'View showing this visual representation' },
            'IsShortcut': { type: 'Boolean', summary: 'Indicates that this visual object points to an Idea contained outside the current (Idea) Container' },
            'MainSymbol': { type: 'VisualSymbol', summary: 'Gets the major symbol of this representation. The body symbol for Concepts, or the main-symbol for Relationships' },
            'RepresentedIdea': { type: 'Idea', summary: 'Represented Idea by this visual representation' }
        }
    },
    {
        name: 'VisualSymbol',
        ancestor: 'VisualElement',
        properties: {
            'AreDetailsShown': { type: 'Boolean', summary: 'Indicates whether the details are currently being shown on the view' },
            'BaseArea': { type: 'Rect', summary: 'Gets the symbol\'s heading rectangle' },
            'BaseCenter': { type: 'Point', summary: 'Central position where the symbol is displayed around' },
            'BaseContentArea': { type: 'Rect', summary: 'Area for the content to be shown in the heading of the symbol' },
            'BaseHeight': { type: 'Double', summary: 'Height of the symbol bounds rectangle area, containing the actual geometry which maybe is not rectangular. For Concepts, this refers to the body; for Relationships, this refers to the main-symbol' },
            'BaseLeft': { type: 'Double', summary: 'Horizontal left position of the symbol bounds rectangle area, containing the actual geometry which maybe is not rectangular. For Concepts, this refers to the body; for Relationships, this refers to the main-symbol' },
            'BaseTop': { type: 'Double', summary: 'Vertical top position of the symbol bounds rectangle area, containing the actual geometry which maybe is not rectangular. For Concepts, this refers to the body; for Relationships, this refers to the main-symbol' },
            'BaseWidth': { type: 'Double', summary: 'Width of the symbol bounds rectangle area, containing the actual geometry which maybe is not rectangular. For Concepts, this refers to the body; for Relationships, this refers to the main-symbol' },
            'Complements': { type: 'EditableList<VisualComplement>', summary: 'Attached visual complements, such as Callouts' },
            'DetailsArea': { type: 'Rect', summary: 'Gets the symbol\'s detail poster area' },
            'DetailsContentArea': { type: 'Rect', summary: 'Area for the content to be shown in the details poster of the symbol' },
            'DetailsPosterHeight': { type: 'Double', summary: 'Current details poster height, even if not shown' },
            'IsAutoPositionable': { type: 'Boolean', summary: 'Indicates whether this visual object can be positioned without explicit user interaction' },
            'IsHorizontallyFlipped': { type: 'Boolean', summary: 'Indicates that the symbol is horizontally flipped' },
            'IsVerticallyFlipped': { type: 'Boolean', summary: 'Indicates that the symbol is vertically flipped' },
            'OriginConnections': { type: 'EditableList<VisualConnector>', summary: 'List of originating connectors whose destination is this symbol' },
            'OwnerRepresentation': { type: 'VisualRepresentation', summary: 'References the owning visual representator' },
            'ShowCompositeContentAsDetails': { type: 'Boolean', summary: 'Indicates to show composite-content as (instead of) details' },
            'TargetConnections': { type: 'EditableList<VisualConnector>', summary: 'List of targeted connectors whose origin is this symbol' },
            'TotalArea': { type: 'Rect', summary: 'Gets the current content area, considering the Heading and Details (if displayed)' },
            'TotalHeight': { type: 'Double', summary: 'Height of the symbol plus its details poster, if shown' }
        }
    }
];
