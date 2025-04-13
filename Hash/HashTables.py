hash_table = {}
hash_table["key1"] = "value1"
hash_table["key2"] = "value2"

print(hash_table["key1"])

# to prevent hash collisions, only in case of custom hash tables:
class CustomKey:
    def __init__(self, id, name):
        self.id = id
        self.name = name
    
    def __hash__(self):
        return hash((self.id, self.name))
    
    def __eq__(self, other):
        return self.id == other.id and self.name == other.name

key1 = CustomKey(1, "One")
key2 = CustomKey(2, "two")
my_dict = {key1: "Item 1", key2: "Item 2"}
if "key2" in my_dict.keys():
    print(hash_table["key3"])
for (a, b) in [1, 2, 3, 4]:
    print(a, b)